"use client";

import { Navbar } from "@/components/Navbar";
import { PlayerCard } from "@/components/PlayerCard";
import { useAccount } from "wagmi";

export const OnboardingPage = () => {
  const { isConnected } = useAccount();

  const handlePlayGame = () => {
    if (isConnected) {
      // Navigate to game page when implemented
      alert("Game page coming soon!");
    } else {
      // Open connect modal
      // The connect button in navbar will handle this
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-24">
            {/* Icon */}
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-600 mb-8">
              <span className="text-3xl">⚽</span>
            </div>

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
            <div className="bg-white p-8 rounded-lg border border-gray-200 hover:border-purple-600 transition-all duration-200 group">
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

              <h3 className="text-xl font-semibold text-black mb-4 tracking-tight">
                Pick Your Squad
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                Build your squad of 15 Premier League players using USDC and
                squad strength points, with a maximum squad strength of 100
                points.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg border border-gray-200 hover:border-purple-600 transition-all duration-200 group">
              {/* League Table */}
              <div className="overflow-x-auto mb-4">
                <table className="w-full text-sm border border-gray-200">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 px-2 font-semibold text-black text-xs border-r border-gray-200">Name</th>
                      <th className="text-left py-2 px-2 font-semibold text-black text-xs border-r border-gray-200">Team</th>
                      <th className="text-right py-2 px-2 font-semibold text-black text-xs border-r border-gray-200">Points</th>
                      <th className="text-center py-2 px-2 font-semibold text-black text-xs w-8"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                      <td className="py-2 px-2 text-gray-700 text-xs border-r border-gray-200">Alex Johnson</td>
                      <td className="py-2 px-2 text-gray-600 text-xs border-r border-gray-200">Man City</td>
                      <td className="py-2 px-2 text-right font-semibold text-black text-xs border-r border-gray-200">245</td>
                      <td className="py-2 px-2 text-center">
                        <span className="text-green-600 text-xs">↑</span>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                      <td className="py-2 px-2 text-gray-700 text-xs border-r border-gray-200">Sarah Williams</td>
                      <td className="py-2 px-2 text-gray-600 text-xs border-r border-gray-200">Liverpool</td>
                      <td className="py-2 px-2 text-right font-semibold text-black text-xs border-r border-gray-200">238</td>
                      <td className="py-2 px-2 text-center">
                        <span className="text-green-600 text-xs">↑</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="py-2 px-2 text-gray-700 text-xs border-r border-gray-200">Mike Brown</td>
                      <td className="py-2 px-2 text-gray-600 text-xs border-r border-gray-200">Arsenal</td>
                      <td className="py-2 px-2 text-right font-semibold text-black text-xs border-r border-gray-200">232</td>
                      <td className="py-2 px-2 text-center">
                        <span className="text-red-600 text-xs">↓</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-xl font-semibold text-black mb-4 tracking-tight">
                Create and Join Leagues
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                Play against friends and family, colleagues or a web community
                in invitational leagues and cups.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg border border-gray-200 hover:border-purple-600 transition-all duration-200 group">
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
      </div>
    </div>
  );
};
