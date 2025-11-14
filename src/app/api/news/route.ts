import { NextResponse } from 'next/server';

interface NewsItem {
  title: string;
  description: string;
  link: string;
  pubDate: string;
  category?: string;
}

export async function GET() {
  try {
    // Fetch from multiple sources for better coverage
    const sources = [
      'https://www.premierleague.com/news/rss',
      'https://feeds.bbci.co.uk/sport/football/rss.xml',
    ];

    const allNews: NewsItem[] = [];

    for (const source of sources) {
      try {
        const response = await fetch(source, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; FPL-Onchain/1.0)',
          },
          next: { revalidate: 3600 }, // Cache for 1 hour
        });

        if (!response.ok) continue;

        const xml = await response.text();
        
        // Parse RSS XML
        const items = parseRSS(xml);
        allNews.push(...items);
      } catch (error) {
        console.error(`Error fetching from ${source}:`, error);
        continue;
      }
    }

    // Filter for Premier League related news
    const premierLeagueNews = allNews
      .filter(item => 
        item.title.toLowerCase().includes('premier league') ||
        item.title.toLowerCase().includes('premier') ||
        item.description.toLowerCase().includes('premier league') ||
        item.title.match(/\b(Arsenal|Chelsea|Liverpool|Man City|Man United|Tottenham|Newcastle|Brighton|West Ham|Aston Villa|Crystal Palace|Fulham|Wolves|Everton|Brentford|Nottingham|Burnley|Luton|Sheffield)\b/i)
      )
      .slice(0, 9); // Get top 9 items

    // Sort by date (newest first)
    premierLeagueNews.sort((a, b) => 
      new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
    );

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

function parseRSS(xml: string): NewsItem[] {
  const items: NewsItem[] = [];
  
  // Simple RSS parser using regex (for production, consider using a proper XML parser)
  const itemRegex = /<item[^>]*>([\s\S]*?)<\/item>/gi;
  const matches = xml.matchAll(itemRegex);

  for (const match of matches) {
    const itemContent = match[1];
    
    const titleMatch = itemContent.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    const descriptionMatch = itemContent.match(/<description[^>]*>([\s\S]*?)<\/description>/i);
    const linkMatch = itemContent.match(/<link[^>]*>([\s\S]*?)<\/link>/i);
    const pubDateMatch = itemContent.match(/<pubDate[^>]*>([\s\S]*?)<\/pubDate>/i);
    const categoryMatch = itemContent.match(/<category[^>]*>([\s\S]*?)<\/category>/i);

    if (titleMatch && descriptionMatch) {
      items.push({
        title: cleanText(titleMatch[1]),
        description: cleanText(descriptionMatch[1]),
        link: linkMatch ? cleanText(linkMatch[1]) : '#',
        pubDate: pubDateMatch ? cleanText(pubDateMatch[1]) : new Date().toISOString(),
        category: categoryMatch ? cleanText(categoryMatch[1]) : 'News',
      });
    }
  }

  return items;
}

function cleanText(text: string): string {
  return text
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .trim();
}

