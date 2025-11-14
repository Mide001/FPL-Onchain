"use client";

import { Navbar } from "@/components/Navbar";
import { PlayerCard } from "@/components/PlayerCard";
import { useAppKitAccount } from "@reown/appkit/react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface NewsItem {
  title: string;
  description: string;
  link: string;
  pubDate: string;
  category?: string;
  image?: string;
}

export const OnboardingPage = () => {
  const { isConnected } = useAppKitAccount();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('/api/news');
        const data = await response.json();
        setNews(data);
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const handlePlayGame = () => {
    if (isConnected) {
      // Navigate to game page when implemented
      alert("Game page coming soon!");
    } else {
      // Open connect modal
      // The connect button in navbar will handle this
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  };

  // Removed emoji helpers
  // Mock wager values for the UI section
  const leftWagerPoints = 68;
  const rightWagerPoints = 62;
  const isLeftWinner = leftWagerPoints > rightWagerPoints;
  const rewardAmount = 70;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-24">
            {/* Icon */}
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-600 mb-8" />

            {/* Heading */}
            <h1 className="text-5xl md:text-7xl font-bold text-black mb-6 leading-[1.1] tracking-tight">
              Fantasy Premier League
              <br />
              <span className="text-purple-600">On the Blockchain</span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-gray-600 mb-12 leading-relaxed max-w-2xl mx-auto font-light">
              Build your dream team, compete with friends, and earn crypto
              rewards. All powered by transparent smart contracts on the
              blockchain.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
              <button
                onClick={handlePlayGame}
                className="px-10 py-4 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-all duration-200 text-base tracking-tight shadow-sm hover:shadow-md border-0 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              >
                {isConnected ? "Play Game" : "Get Started"}
              </button>
              <button className="px-10 py-4 bg-white text-black font-semibold rounded-lg border-2 border-gray-300 hover:border-purple-600 hover:text-purple-600 transition-all duration-200 text-base tracking-tight">
                Learn More
              </button>
            </div>
          </div>

          {/* Three Column Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
            <div className="bg-white p-8 rounded-lg border border-gray-200 hover:border-purple-600 transition-all duration-200 group flex flex-col animate-fade-in-up" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
              {/* Player Cards */}
              <div className="relative h-28 mb-6 group/cards flex items-center justify-start gap-2">
                <div
                  className="w-24 transition-all duration-500 ease-out group-hover/cards:rotate-0"
                  style={{
                    transform: "rotate(-10deg)",
                  }}
                >
                  <PlayerCard
                    name="Erling Haaland"
                    position="FWD"
                    team="Man City"
                    price="14.0 USDC"
                    photo="https://resources.premierleague.com/premierleague/photos/players/250x250/p223094.png"
                    index={0}
                  />
                </div>
                <div
                  className="w-24 transition-all duration-500 ease-out group-hover/cards:rotate-0"
                  style={{
                    transform: "rotate(0deg)",
                  }}
                >
                  <PlayerCard
                    name="Mohamed Salah"
                    position="MID"
                    team="Liverpool"
                    price="13.5 USDC"
                    photo="https://backend.liverpoolfc.com/sites/default/files/styles/sm/public/2025-09/mohamed-salah-2025-26-headshot-straight_d3131fc8d0587fe6937b5592e4afcfd5.webp?itok=OATKXCBP"
                    index={1}
                  />
                </div>
                <div
                  className="w-24 transition-all duration-500 ease-out group-hover/cards:rotate-0"
                  style={{
                    transform: "rotate(10deg)",
                  }}
                >
                  <PlayerCard
                    name="Bukayo Saka"
                    position="MID"
                    team="Arsenal"
                    price="12.5 USDC"
                    photo="https://www.arsenal.com/sites/default/files/styles/large_16x9/public/images/SAKA_Headshot_web_mxqw4vma.png?h=ad73a5fe&auto=webp&itok=sF_7_QGZ"
                    index={2}
                  />
                </div>
              </div>

              <div className="mt-auto">
                <h3 className="text-xl font-semibold text-black mb-4 tracking-tight">
                  Pick Your Squad
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  Build your squad of 15 Premier League players using USDC and
                  squad strength points, with a maximum squad strength of 100
                  points.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg border border-gray-200 hover:border-purple-600 transition-all duration-200 group flex flex-col animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
              {/* League Table */}
              <div className="overflow-x-auto mb-4 -mt-4">
                <table className="w-full text-sm border border-gray-200">
                  <thead>
                    <tr className="border-b border-gray-200 bg-purple-50">
                      <th className="text-center py-2 px-2 font-semibold text-black text-xs border-r border-gray-200 w-10">S/N</th>
                      <th className="text-left py-2 px-2 font-semibold text-black text-xs border-r border-gray-200">Team Name</th>
                      <th className="text-right py-2 px-2 font-semibold text-black text-xs border-r border-gray-200">Value</th>
                      <th className="text-right py-2 px-2 font-semibold text-black text-xs border-r border-gray-200">Points</th>
                      <th className="text-center py-2 px-2 font-semibold text-black text-xs w-8"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200 hover:bg-purple-50/30 transition-colors bg-white">
                      <td className="py-2 px-2 text-center text-gray-700 text-xs border-r border-gray-200 font-medium">1</td>
                      <td className="py-2 px-2 text-gray-700 text-xs border-r border-gray-200">Thunder Strikers</td>
                      <td className="py-2 px-2 text-right font-semibold text-black text-xs border-r border-gray-200">
                        <div className="flex items-center justify-end gap-1">
                          <span>138.2</span>
                          <Image 
                            src="/usdc.png"
                            alt="USDC"
                            width={12}
                            height={12}
                            className="flex-shrink-0"
                          />
                        </div>
                      </td>
                      <td className="py-2 px-2 text-right font-semibold text-purple-600 text-xs border-r border-gray-200">245</td>
                      <td className="py-2 px-2 text-center">
                        <span className="text-green-600 text-xs">↑</span>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-purple-50/30 transition-colors bg-gray-50/50">
                      <td className="py-2 px-2 text-center text-gray-700 text-xs border-r border-gray-200 font-medium">2</td>
                      <td className="py-2 px-2 text-gray-700 text-xs border-r border-gray-200">Red Devils FC</td>
                      <td className="py-2 px-2 text-right font-semibold text-black text-xs border-r border-gray-200">
                        <div className="flex items-center justify-end gap-1">
                          <span>144.8</span>
                          <Image 
                            src="/usdc.png"
                            alt="USDC"
                            width={12}
                            height={12}
                            className="flex-shrink-0"
                          />
                        </div>
                      </td>
                      <td className="py-2 px-2 text-right font-semibold text-purple-600 text-xs border-r border-gray-200">238</td>
                      <td className="py-2 px-2 text-center">
                        <span className="text-green-600 text-xs">↑</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-purple-50/30 transition-colors bg-white">
                      <td className="py-2 px-2 text-center text-gray-700 text-xs border-r border-gray-200 font-medium">3</td>
                      <td className="py-2 px-2 text-gray-700 text-xs border-r border-gray-200">Blue Warriors</td>
                      <td className="py-2 px-2 text-right font-semibold text-black text-xs border-r border-gray-200">
                        <div className="flex items-center justify-end gap-1">
                          <span>139.5</span>
                          <Image 
                            src="/usdc.png"
                            alt="USDC"
                            width={12}
                            height={12}
                            className="flex-shrink-0"
                          />
                        </div>
                      </td>
                      <td className="py-2 px-2 text-right font-semibold text-purple-600 text-xs border-r border-gray-200">232</td>
                      <td className="py-2 px-2 text-center">
                        <span className="text-red-600 text-xs">↓</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-auto">
                <h3 className="text-xl font-semibold text-black mb-4 tracking-tight">
                  Create and Join Leagues
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  Play against friends and family, colleagues or a web community
                  in invitational leagues and cups.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg border border-gray-200 hover:border-purple-600 transition-all duration-200 group flex flex-col animate-fade-in-up" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
              {/* Wager Card */}
              <div className="bg-gradient-to-br from-purple-50 to-white border border-purple-200 rounded-lg p-3 mb-4 -mt-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs text-gray-600">Week 15 Wager</p>
                  <div />
                </div>
                
                <div className="flex items-center gap-2">
                  {/* Left Team Card */}
                  <div className="relative flex-1 h-20 bg-white rounded-lg border-2 border-purple-600 p-2 flex flex-col items-center justify-center">
                    {isLeftWinner && (
                      <div className="absolute -bottom-2 -right-2 z-10 bg-green-100 px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                        <span className="text-green-700 font-semibold text-xs">+{rewardAmount}</span>
                        <Image 
                          src="/usdc.png"
                          alt="USDC"
                          width={10}
                          height={10}
                          className="flex-shrink-0"
                        />
                      </div>
                    )}
                    <p className="font-semibold text-black text-[10px] mb-0.5 text-center leading-tight">Thunder Strikers</p>
                    <p className="text-gray-500 text-[9px] mb-1">Your Team</p>
                    <p className="font-bold text-purple-600 text-sm">{leftWagerPoints}</p>
                    <p className="text-gray-500 text-[8px]">pts</p>
                  </div>
                  
                  {/* VS Center */}
                  <div className="flex-shrink-0">
                    <span className="text-gray-400 font-semibold text-xs">vs</span>
                  </div>
                  
                  {/* Right Team Card */}
                  <div className="relative flex-1 h-20 bg-gray-50 rounded-lg border-2 border-gray-300 p-2 flex flex-col items-center justify-center">
                    {!isLeftWinner && (
                      <div className="absolute -bottom-2 -right-2 z-10 bg-green-100 px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                        <span className="text-green-700 font-semibold text-xs">+{rewardAmount}</span>
                        <Image 
                          src="/usdc.png"
                          alt="USDC"
                          width={10}
                          height={10}
                          className="flex-shrink-0"
                        />
                      </div>
                    )}
                    <p className="font-semibold text-black text-[10px] mb-0.5 text-center leading-tight">Red Devils FC</p>
                    <p className="text-gray-500 text-[9px] mb-1">Opponent</p>
                    <p className="font-bold text-gray-600 text-sm">{rightWagerPoints}</p>
                    <p className="text-gray-500 text-[8px]">pts</p>
                  </div>
                </div>
              </div>

              <div className="mt-auto">
                <h3 className="text-xl font-semibold text-black mb-4 tracking-tight">
                  Create a Wager
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  Compete with friends, place a wager and get rewarded if you get
                  the higher point for the week.
                </p>
              </div>
            </div>
          </div>

          {/* Premier League News Section */}
          <div className="mt-24">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4 tracking-tight">
                Premier League News
              </h2>
              <p className="text-gray-600 text-lg">
                Stay updated with the latest from the Premier League
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {loading ? (
                // Loading state
                <>
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white border border-gray-200 rounded-lg overflow-hidden animate-pulse">
                      <div className="h-48 bg-gradient-to-br from-purple-100 to-gray-100" />
                      <div className="p-6">
                        <div className="h-4 bg-gray-200 rounded w-24 mb-4"></div>
                        <div className="h-6 bg-gray-200 rounded w-full mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                      </div>
                    </div>
                  ))}
                </>
              ) : news.length > 0 ? (
                // Real news cards
                news.map((item, index) => (
                  <a
                    key={index}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-purple-600 transition-all duration-200 group cursor-pointer block shadow-sm hover:shadow-md hover:-translate-y-0.5"
                  >
                  <div className="h-52 relative overflow-hidden">
                    <div className="absolute inset-0">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          unoptimized
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-purple-100 to-gray-100" />
                      )}
                    </div>
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    {/* Top badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                      {item.category ? (
                        <span className="inline-flex items-center rounded-full bg-white/85 backdrop-blur px-2.5 py-1 text-[10px] font-medium text-gray-800 border border-white/60 shadow-sm">
                          {item.category}
                        </span>
                      ) : <span />}
                      <span className="inline-flex items-center rounded-full bg-black/50 backdrop-blur px-2 py-1 text-[10px] font-medium text-white">
                        {formatTimeAgo(item.pubDate)}
                      </span>
                    </div>
                    {/* Title on image */}
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="text-white text-base md:text-lg font-semibold leading-snug line-clamp-2 drop-shadow">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-3">
                      {item.description}
                    </p>
                    <div className="flex items-center text-sm font-medium text-purple-600 group-hover:text-purple-700">
                      <span>Read article</span>
                      <svg className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l5.0 5.0a1 1 0 010 1.414l-5.0 5.0a1 1 0 01-1.414-1.414L13.586 11H4a1 1 0 110-2h9.586l-3.293-3.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  </a>
                ))
              ) : (
                // Fallback if no news is available
                <div className="col-span-3 text-center py-12">
                  <p className="text-gray-600">No news available at the moment. Please check back later.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
