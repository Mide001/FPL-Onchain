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

