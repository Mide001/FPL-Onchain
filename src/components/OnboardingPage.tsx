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
  const [isClubModalOpen, setIsClubModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 2; // Step 1: Club Name, Step 2: Supported Team
  const [clubName, setClubName] = useState("");
  const [clubNameError, setClubNameError] = useState("");
  const [selectedClub, setSelectedClub] = useState<string>("");
  const [clubError, setClubError] = useState("");

  // Premier League Clubs 2024/25
  const premierLeagueClubs = [
    { name: "Arsenal", logo: "https://resources.premierleague.com/premierleague/badges/50/t3.png" },
    { name: "Aston Villa", logo: "https://resources.premierleague.com/premierleague/badges/50/t7.png" },
    { name: "Bournemouth", logo: "https://resources.premierleague.com/premierleague/badges/50/t91.png" },
    { name: "Brentford", logo: "https://resources.premierleague.com/premierleague/badges/50/t94.png" },
    { name: "Brighton", logo: "https://resources.premierleague.com/premierleague/badges/50/t36.png" },
    { name: "Chelsea", logo: "https://resources.premierleague.com/premierleague/badges/50/t8.png" },
    { name: "Crystal Palace", logo: "https://resources.premierleague.com/premierleague/badges/50/t31.png" },
    { name: "Everton", logo: "https://resources.premierleague.com/premierleague/badges/50/t11.png" },
    { name: "Fulham", logo: "https://resources.premierleague.com/premierleague/badges/50/t54.png" },
    { name: "Ipswich", logo: "https://resources.premierleague.com/premierleague/badges/50/t49.png" },
    { name: "Leicester", logo: "https://resources.premierleague.com/premierleague/badges/50/t13.png" },
    { name: "Liverpool", logo: "https://resources.premierleague.com/premierleague/badges/50/t14.png" },
    { name: "Manchester City", logo: "https://resources.premierleague.com/premierleague/badges/50/t43.png" },
    { name: "Manchester United", logo: "https://resources.premierleague.com/premierleague/badges/50/t1.png" },
    { name: "Newcastle", logo: "https://resources.premierleague.com/premierleague/badges/50/t4.png" },
    { name: "Nottingham Forest", logo: "https://resources.premierleague.com/premierleague/badges/50/t17.png" },
    { name: "Southampton", logo: "https://resources.premierleague.com/premierleague/badges/50/t20.png" },
    { name: "Tottenham", logo: "https://resources.premierleague.com/premierleague/badges/50/t6.png" },
    { name: "West Ham", logo: "https://resources.premierleague.com/premierleague/badges/50/t21.png" },
    { name: "Wolves", logo: "https://resources.premierleague.com/premierleague/badges/50/t39.png" },
  ];

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch("/api/news");
        const data = await response.json();
        setNews(data);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const handlePlayGame = () => {
    if (isConnected) {
      setIsClubModalOpen(true);
      setCurrentStep(1);
      setClubNameError("");
    }
  };

  const handleCloseClubModal = () => {
    setIsClubModalOpen(false);
    setCurrentStep(1);
    setClubName("");
    setClubNameError("");
    setSelectedClub("");
    setClubError("");
  };

  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (currentStep === 1) {
      // Step 1: Club Name validation
      if (!clubName.trim()) {
        setClubNameError("Please enter a name for your fantasy club.");
        return;
      }
      handleNextStep();
    } else if (currentStep === 2) {
      // Step 2: Supported Club validation
      if (!selectedClub) {
        setClubError("Please select your supported Premier League club.");
        return;
      }
      
      // Complete the flow
      alert(`Welcome, ${clubName}! You support ${selectedClub}.`);
      handleCloseClubModal();
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24)
      return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
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
      <div className="relative pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-[85vh] flex items-center">
        {/* Animated Background with Moving Gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-white to-purple-50/30">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(147,51,234,0.15),transparent_60%)] animate-gradient-move"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(147,51,234,0.12),transparent_60%)] animate-gradient-move-reverse"></div>
        </div>

        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(147,51,234,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(147,51,234,0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
            animation: 'grid-move 20s linear infinite'
          }}></div>
        </div>

        {/* Floating Orbs with Better Animation */}
        <div className="absolute top-10 left-[10%] w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-float" style={{ animationDuration: '8s' }}></div>
        <div className="absolute bottom-10 right-[15%] w-[500px] h-[500px] bg-purple-300/8 rounded-full blur-3xl animate-float-reverse" style={{ animationDuration: '10s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-200/5 rounded-full blur-3xl animate-float" style={{ animationDuration: '12s' }}></div>

        {/* Decorative Lines */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-purple-200/20 to-transparent"></div>
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-200/20 to-transparent"></div>

        <div className="relative max-w-7xl mx-auto w-full z-10">
          <div className="text-center max-w-5xl mx-auto">
            {/* Badge/Tagline */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100/50 backdrop-blur-sm border border-purple-200/50 mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
              <span className="w-2 h-2 bg-purple-600 rounded-full animate-pulse"></span>
              <span className="text-sm font-medium text-purple-700">On-Chain Fantasy Football</span>
            </div>

            {/* Heading with Word-by-Word Animation */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-black mb-6 leading-[0.92] tracking-[-0.02em]">
              <span className="inline-block animate-word-fade-in" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>Fantasy</span>{' '}
              <span className="inline-block animate-word-fade-in" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>Premier</span>{' '}
              <span className="inline-block animate-word-fade-in" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>League</span>
              <br />
              <span className="inline-block animate-word-fade-in" style={{ animationDelay: '0.5s', animationFillMode: 'both' }}>On the</span>{' '}
              <span className="inline-block text-purple-600 bg-gradient-to-r from-purple-600 via-purple-500 to-purple-600 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-shimmer" style={{ animationDelay: '0.6s', animationFillMode: 'both' }}>
                Blockchain
              </span>
            </h1>

            {/* Description with Staggered Animation */}
            <p className="text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed max-w-3xl mx-auto font-light">
              <span className="inline-block animate-word-fade-in" style={{ animationDelay: '0.7s', animationFillMode: 'both' }}>Build your dream team,</span>{' '}
              <span className="inline-block animate-word-fade-in" style={{ animationDelay: '0.75s', animationFillMode: 'both' }}>compete with friends,</span>{' '}
              <span className="inline-block animate-word-fade-in" style={{ animationDelay: '0.8s', animationFillMode: 'both' }}>and earn crypto rewards.</span>
              <br />
              <span className="inline-block animate-word-fade-in" style={{ animationDelay: '0.85s', animationFillMode: 'both' }}>All powered by transparent</span>{' '}
              <span className="inline-block animate-word-fade-in" style={{ animationDelay: '0.9s', animationFillMode: 'both' }}>smart contracts on the blockchain.</span>
            </p>

            {/* CTA Buttons with Enhanced Design */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up" style={{ animationDelay: '1s', animationFillMode: 'both' }}>
              {isConnected && (
                <button
                  onClick={handlePlayGame}
                  className="group relative px-6 py-4.5 bg-black text-white font-semibold rounded-full hover:bg-gray-900 transition-all duration-300 text-sm tracking-tight shadow-2xl hover:shadow-purple-500/20 hover:scale-105 border-0 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Get Started
                    <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </button>
              )}
              <button className="px-6 py-4.5 bg-white/80 backdrop-blur-sm text-black font-semibold rounded-full border-2 border-gray-200/50 hover:border-purple-300 hover:bg-white hover:text-black transition-all duration-300 text-sm tracking-tight shadow-lg hover:shadow-xl hover:scale-105">
                Learn More
              </button>
            </div>

            {/* Stats or Trust Indicators */}
            <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-gray-500 animate-fade-in-up" style={{ animationDelay: '1.2s', animationFillMode: 'both' }}>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                <span>Fully On-Chain</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                <span>Transparent Rewards</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                <span>No Resets</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features and News Section */}
      <div className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-6xl mx-auto">
          {/* Three Column Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
            <div
              className="bg-white p-8 rounded-lg border border-gray-200 hover:border-purple-600 transition-all duration-200 group flex flex-col animate-fade-in-up"
              style={{ animationDelay: "0.1s", animationFillMode: "both" }}
            >
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

            <div
              className="bg-white p-8 rounded-lg border border-gray-200 hover:border-purple-600 transition-all duration-200 group flex flex-col animate-fade-in-up"
              style={{ animationDelay: "0.2s", animationFillMode: "both" }}
            >
              {/* League Table */}
              <div className="overflow-x-auto mb-4 -mt-4">
                <table className="w-full text-sm border border-gray-200">
                  <thead>
                    <tr className="border-b border-gray-200 bg-purple-50">
                      <th className="text-center py-2 px-2 font-semibold text-black text-xs border-r border-gray-200 w-10">
                        S/N
                      </th>
                      <th className="text-left py-2 px-2 font-semibold text-black text-xs border-r border-gray-200">
                        Team Name
                      </th>
                      <th className="text-right py-2 px-2 font-semibold text-black text-xs border-r border-gray-200">
                        Value
                      </th>
                      <th className="text-right py-2 px-2 font-semibold text-black text-xs border-r border-gray-200">
                        Points
                      </th>
                      <th className="text-center py-2 px-2 font-semibold text-black text-xs w-8"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200 hover:bg-purple-50/30 transition-colors bg-white">
                      <td className="py-2 px-2 text-center text-gray-700 text-xs border-r border-gray-200 font-medium">
                        1
                      </td>
                      <td className="py-2 px-2 text-gray-700 text-xs border-r border-gray-200">
                        Thunder Strikers
                      </td>
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
                      <td className="py-2 px-2 text-right font-semibold text-purple-600 text-xs border-r border-gray-200">
                        245
                      </td>
                      <td className="py-2 px-2 text-center">
                        <span className="text-green-600 text-xs">↑</span>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-purple-50/30 transition-colors bg-gray-50/50">
                      <td className="py-2 px-2 text-center text-gray-700 text-xs border-r border-gray-200 font-medium">
                        2
                      </td>
                      <td className="py-2 px-2 text-gray-700 text-xs border-r border-gray-200">
                        Red Devils FC
                      </td>
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
                      <td className="py-2 px-2 text-right font-semibold text-purple-600 text-xs border-r border-gray-200">
                        238
                      </td>
                      <td className="py-2 px-2 text-center">
                        <span className="text-green-600 text-xs">↑</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-purple-50/30 transition-colors bg-white">
                      <td className="py-2 px-2 text-center text-gray-700 text-xs border-r border-gray-200 font-medium">
                        3
                      </td>
                      <td className="py-2 px-2 text-gray-700 text-xs border-r border-gray-200">
                        Blue Warriors
                      </td>
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
                      <td className="py-2 px-2 text-right font-semibold text-purple-600 text-xs border-r border-gray-200">
                        232
                      </td>
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

            <div
              className="bg-white p-8 rounded-lg border border-gray-200 hover:border-purple-600 transition-all duration-200 group flex flex-col animate-fade-in-up"
              style={{ animationDelay: "0.3s", animationFillMode: "both" }}
            >
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
                        <span className="text-green-700 font-semibold text-xs">
                          +{rewardAmount}
                        </span>
                        <Image
                          src="/usdc.png"
                          alt="USDC"
                          width={10}
                          height={10}
                          className="flex-shrink-0"
                        />
                      </div>
                    )}
                    <p className="font-semibold text-black text-[10px] mb-0.5 text-center leading-tight">
                      Thunder Strikers
                    </p>
                    <p className="text-gray-500 text-[9px] mb-1">Your Team</p>
                    <p className="font-bold text-purple-600 text-sm">
                      {leftWagerPoints}
                    </p>
                    <p className="text-gray-500 text-[8px]">pts</p>
                  </div>

                  {/* VS Center */}
                  <div className="flex-shrink-0">
                    <span className="text-gray-400 font-semibold text-xs">
                      vs
                    </span>
                  </div>

                  {/* Right Team Card */}
                  <div className="relative flex-1 h-20 bg-gray-50 rounded-lg border-2 border-gray-300 p-2 flex flex-col items-center justify-center">
                    {!isLeftWinner && (
                      <div className="absolute -bottom-2 -right-2 z-10 bg-green-100 px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                        <span className="text-green-700 font-semibold text-xs">
                          +{rewardAmount}
                        </span>
                        <Image
                          src="/usdc.png"
                          alt="USDC"
                          width={10}
                          height={10}
                          className="flex-shrink-0"
                        />
                      </div>
                    )}
                    <p className="font-semibold text-black text-[10px] mb-0.5 text-center leading-tight">
                      Red Devils FC
                    </p>
                    <p className="text-gray-500 text-[9px] mb-1">Opponent</p>
                    <p className="font-bold text-gray-600 text-sm">
                      {rightWagerPoints}
                    </p>
                    <p className="text-gray-500 text-[8px]">pts</p>
                  </div>
                </div>
              </div>

              <div className="mt-auto">
                <h3 className="text-xl font-semibold text-black mb-4 tracking-tight">
                  Create a Wager
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  Compete with friends, place a wager and get rewarded if you
                  get the higher point for the week.
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
                    <div
                      key={i}
                      className="bg-white border border-gray-200 rounded-lg overflow-hidden animate-pulse"
                    >
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
                        ) : (
                          <span />
                        )}
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
                        <svg
                          className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.293 3.293a1 1 0 011.414 0l5.0 5.0a1 1 0 010 1.414l-5.0 5.0a1 1 0 01-1.414-1.414L13.586 11H4a1 1 0 110-2h9.586l-3.293-3.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                  </a>
                ))
              ) : (
                // Fallback if no news is available
                <div className="col-span-3 text-center py-12">
                  <p className="text-gray-600">
                    No news available at the moment. Please check back later.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Multi-Step Modal */}
      {isClubModalOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 sm:p-8 space-y-6 animate-fade-in-up" style={{ animationFillMode: "both" }}>
            {/* Progress Indicator */}
            <div className="flex items-center justify-center gap-2 mb-4">
              {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
                <div
                  key={step}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    step <= currentStep
                      ? "bg-purple-600 w-8"
                      : "bg-gray-200 w-2"
                  }`}
                />
              ))}
            </div>

            {/* Step Content */}
            <form className="space-y-5" onSubmit={handleStepSubmit}>
              {/* Step 1: Club Name */}
              {currentStep === 1 && (
                <div>
                  <div className="mb-5">
                    <h3 className="text-2xl font-bold text-black mb-2">Name Your Fantasy Club</h3>
                    <p className="text-gray-600 text-sm">
                      This is the identity of your fantasy football team. You can change it later.
                    </p>
                  </div>
                  <div>
                    <label htmlFor="clubName" className="text-sm font-semibold text-gray-700">
                      Club Name
                    </label>
                    <input
                      id="clubName"
                      name="clubName"
                      type="text"
                      value={clubName}
                      onChange={(event) => {
                        setClubName(event.target.value);
                        setClubNameError("");
                      }}
                      placeholder="e.g., Thunder Strikers FC"
                      className={`mt-2 w-full rounded-xl border px-4 py-3 text-base text-gray-900 placeholder:text-gray-400 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:bg-white ${
                        clubNameError ? "border-red-500" : "border-gray-200"
                      }`}
                      autoFocus
                    />
                    {clubNameError && <p className="text-sm text-red-500 mt-1">{clubNameError}</p>}
                  </div>
                </div>
              )}

              {/* Step 2: Supported Club Selection */}
              {currentStep === 2 && (
                <div>
                  <div className="mb-5">
                    <h3 className="text-2xl font-bold text-black mb-2">Which Club Do You Support?</h3>
                    <p className="text-gray-600 text-sm">
                      Select your favorite Premier League club. This helps personalize your experience.
                    </p>
                  </div>
                  
                  <div className="max-h-[400px] overflow-y-auto pr-2">
                    <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                      {premierLeagueClubs.map((club) => (
                        <button
                          key={club.name}
                          type="button"
                          onClick={() => {
                            setSelectedClub(club.name);
                            setClubError("");
                          }}
                          className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all duration-200 hover:scale-105 ${
                            selectedClub === club.name
                              ? "border-purple-600 bg-purple-50 shadow-md"
                              : "border-gray-200 bg-white hover:border-purple-300 hover:bg-purple-50/30"
                          }`}
                        >
                          <div className="w-12 h-12 mb-2 flex items-center justify-center">
                            <Image
                              src={club.logo}
                              alt={club.name}
                              width={48}
                              height={48}
                              className="object-contain"
                              unoptimized
                            />
                          </div>
                          <span className={`text-xs font-medium text-center leading-tight ${
                            selectedClub === club.name ? "text-purple-700" : "text-gray-700"
                          }`}>
                            {club.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {clubError && (
                    <p className="text-sm text-red-500 mt-3 text-center">{clubError}</p>
                  )}
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={handlePreviousStep}
                    className="px-5 py-3 rounded-full border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                  >
                    Previous
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleCloseClubModal}
                  className="px-5 py-3 rounded-full border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-full bg-black text-white font-semibold hover:bg-gray-900 transition-colors"
                >
                  {currentStep === totalSteps ? "Save" : "Next"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
