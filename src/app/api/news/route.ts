import { NextResponse } from 'next/server';
import Parser from 'rss-parser';

const parser = new Parser();

interface NewsItem {
  title: string;
  description: string;
  link: string;
  pubDate: string;
  category?: string;
  image?: string;
}

export async function GET() {
  try {
    // Try The Guardian Content API first if API key is provided
    const guardianApiKey = process.env.GUARDIAN_API_KEY;
    if (guardianApiKey) {
      try {
        const url = new URL('https://content.guardianapis.com/search');
        url.searchParams.set('section', 'football');
        url.searchParams.set('q', 'premier league');
        url.searchParams.set('order-by', 'newest');
        url.searchParams.set('page-size', '9');
        url.searchParams.set('show-fields', 'thumbnail,trailText,byline,short-url');
        url.searchParams.set('api-key', guardianApiKey);
        
        const res = await fetch(url.toString(), { cache: 'no-store' });
        if (res.ok) {
          const json = await res.json();
          const results = json?.response?.results || [];
          const items: NewsItem[] = results.map((r: any) => ({
            title: r?.webTitle || 'No title',
            description: r?.fields?.trailText || '',
            link: r?.webUrl || '#',
            pubDate: r?.webPublicationDate || new Date().toISOString(),
            category: r?.sectionName || 'News',
            image: r?.fields?.thumbnail,
          }));
          if (items.length > 0) {
            items.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
            return NextResponse.json(items.slice(0, 3));
          }
        } else {
          console.error('Guardian response not OK:', res.status, await res.text().catch(() => ''));
        }
      } catch (err) {
        console.error('Error fetching Guardian news:', err);
      }
    }

    // Try Sportmonks first if token is provided
    const sportmonksToken = process.env.SPORTMONKS_API_TOKEN;
    const sportmonksNews: NewsItem[] = [];

    if (sportmonksToken) {
      try {
        // Premier League league_id on Sportmonks is commonly 8
        const leagueId = 8;
        const url = new URL('https://api.sportmonks.com/v3/football/news');
        url.searchParams.set('api_token', sportmonksToken);
        url.searchParams.set('filter[league]', String(leagueId));
        url.searchParams.set('fields[news]', 'title,short_description,thumbnail,updated_at,source,widget_url');

        const res = await fetch(url.toString(), {
          headers: {
            Accept: 'application/json',
          },
          // Ensure we don't cache on server for fresher news
          cache: 'no-store',
        });

        if (res.ok) {
          const json = await res.json();
          console.log('Sportmonks raw response (first items):', JSON.stringify((json?.data || []).slice(0, 3), null, 2));
          // v3 payload typically: { data: [ ...news ] }
          const items = (json?.data || []).map((n: any): NewsItem => {
            const title = n?.title || 'No title';
            const description = n?.short_description || '';
            const link = n?.widget_url || n?.source || '#';
            const pubDate = n?.updated_at || new Date().toISOString();
            const image = n?.thumbnail || undefined;
            return {
              title,
              description,
              link,
              pubDate,
              category: 'Premier League',
              image,
            };
          }) as NewsItem[];

          // If Sportmonks returns items, prefer them (limit to 3)
          if (items.length > 0) {
            // Sort newest first by pubDate if available
            items.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
            return NextResponse.json(items.slice(0, 3));
          }
        } else {
          console.error('Sportmonks response not OK:', res.status, await res.text().catch(() => ''));
        }
      } catch (err) {
        console.error('Error fetching Sportmonks news:', err);
      }
    }

    // Fetch from multiple sources for better coverage
    const sources = [
      'https://feeds.bbci.co.uk/sport/football/rss.xml',
      'https://www.skysports.com/rss/12040',
    ];

    const allNews: NewsItem[] = [];

    for (const source of sources) {
      try {
        const feed = await parser.parseURL(source);
        
        if (feed.items && feed.items.length > 0) {
          const items: NewsItem[] = feed.items.map((item) => {
            // Extract image from content or enclosure
            let image: string | undefined;
            
            // Try to get image from enclosure
            if (item.enclosure && item.enclosure.type?.startsWith('image/')) {
              image = item.enclosure.url;
            }
            
            // Try to extract image from content/description HTML
            if (!image && item.content) {
              const imgMatch = item.content.match(/<img[^>]+src="([^"]+)"/i);
              if (imgMatch) {
                image = imgMatch[1];
              }
            }
            
            if (!image && item.contentSnippet) {
              const imgMatch = item.contentSnippet.match(/<img[^>]+src="([^"]+)"/i);
              if (imgMatch) {
                image = imgMatch[1];
              }
            }
            
            // Try to get from itunes image
            if (!image && (item as any).itunes?.image) {
              image = (item as any).itunes.image;
            }
            
            return {
              title: item.title || 'No title',
              description: item.contentSnippet || item.content || item.description || '',
              link: item.link || '#',
              pubDate: item.pubDate || item.isoDate || new Date().toISOString(),
              category: item.categories?.[0] || 'News',
              image: image,
            };
          });
          
          allNews.push(...items);
        }
      } catch (error) {
        console.error(`Error fetching from ${source}:`, error);
        continue;
      }
    }

    // Filter for Premier League related news
    const premierLeagueKeywords = [
      'premier league',
      'premier',
      'arsenal', 'chelsea', 'liverpool', 'man city', 'man united', 'tottenham',
      'newcastle', 'brighton', 'west ham', 'aston villa', 'crystal palace',
      'fulham', 'wolves', 'everton', 'brentford', 'nottingham', 'burnley',
      'luton', 'sheffield', 'bournemouth', 'palace'
    ];

    const premierLeagueNews = allNews
      .filter(item => {
        const titleLower = item.title.toLowerCase();
        const descLower = item.description.toLowerCase();
        return premierLeagueKeywords.some(keyword => 
          titleLower.includes(keyword) || descLower.includes(keyword)
        );
      })
      .slice(0, 9); // Get top 9 items

    // Sort by date (newest first)
    premierLeagueNews.sort((a, b) => {
      const dateA = new Date(a.pubDate).getTime();
      const dateB = new Date(b.pubDate).getTime();
      return dateB - dateA;
    });

    return NextResponse.json(premierLeagueNews.slice(0, 3)); // Return top 3
  } catch (error) {
    console.error('Error fetching news:', error);
    
    // Fallback news if API fails
    return NextResponse.json([
      {
        title: 'Premier League Latest Updates',
        description: 'Stay tuned for the latest Premier League news and updates.',
        link: 'https://www.premierleague.com',
        pubDate: new Date().toISOString(),
        category: 'General',
      },
    ]);
  }
}

