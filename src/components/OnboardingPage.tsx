'use client'

import { Navbar } from "@/components/Navbar";
import { ConnectButton } from "@/components/ConnectButton";
import { useAccount } from "wagmi";

export const OnboardingPage = () => {
  const { isConnected } = useAccount();

  const handlePlayGame = () => {
    if (isConnected) {
      // Navigate to game page when implemented
      alert('Game page coming soon!');
    } else {
      // Scroll to connect button
      document.getElementById('connect-section')?.scrollIntoView({ behavior: 'smooth' });
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
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-black mb-8">
              <span className="text-3xl">⚽</span>
            </div>
            
            {/* Heading */}
            <h1 className="text-5xl md:text-7xl font-bold text-black mb-6 leading-[1.1] tracking-tight">
              Fantasy Premier League
              <br />
              <span className="text-black/80">On the Blockchain</span>
            </h1>
            
            {/* Description */}
            <p className="text-lg md:text-xl text-gray-600 mb-12 leading-relaxed max-w-2xl mx-auto font-light">
              Build your dream team, compete with friends, and earn crypto rewards. 
              All powered by transparent smart contracts on the blockchain.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
              <button
                onClick={handlePlayGame}
                className="px-10 py-4 bg-black text-white font-semibold rounded-lg hover:bg-gray-900 transition-all duration-200 text-base tracking-tight border border-black shadow-sm hover:shadow-md"
              >
                {isConnected ? 'Play Game' : 'Get Started'}
              </button>
              <button className="px-10 py-4 bg-white text-black font-semibold rounded-lg border-2 border-black hover:bg-black hover:text-white transition-all duration-200 text-base tracking-tight">
                Learn More
              </button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            <div className="bg-white p-8 rounded-lg border border-gray-200 hover:border-black transition-all duration-200 group">
              <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-2xl">⚽</span>
              </div>
              <h3 className="text-xl font-semibold text-black mb-3 tracking-tight">Build Your Team</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                Select your fantasy team of Premier League players and lock it securely on-chain before each gameweek.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg border border-gray-200 hover:border-black transition-all duration-200 group">
              <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-semibold text-black mb-3 tracking-tight">Earn Points</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                Points are automatically calculated based on real match performances and recorded on-chain.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg border border-gray-200 hover:border-black transition-all duration-200 group">
              <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-xl font-semibold text-black mb-3 tracking-tight">Win Rewards</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                Compete for crypto rewards. Top performers get paid automatically via smart contracts.
              </p>
            </div>
          </div>

          {/* Connect Section */}
          {!isConnected && (
            <div id="connect-section" className="mt-16 text-center">
              <div className="bg-gray-50 rounded-lg p-12 border border-gray-200 max-w-2xl mx-auto">
                <h2 className="text-3xl font-bold text-black mb-4 tracking-tight">
                  Ready to Start Playing?
                </h2>
                <p className="text-gray-600 mb-8 text-base">
                  Connect your wallet to create your team and start competing
                </p>
                <div className="flex justify-center">
                  <ConnectButton />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
