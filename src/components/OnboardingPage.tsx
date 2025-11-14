'use client'

import { Navbar } from "@/components/Navbar";
import { useAccount } from "wagmi";

export const OnboardingPage = () => {
  const { isConnected } = useAccount();

  const handlePlayGame = () => {
    if (isConnected) {
      // Navigate to game page when implemented
      // For now, just show a message or scroll
      alert('Game page coming soon!');
    } else {
      // Scroll to connect button
      document.getElementById('connect-section')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      
      {/* Hero Section */}
      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 mb-8 shadow-lg">
              <span className="text-4xl">⚽</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Fantasy Premier League
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                On the Blockchain
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-12 leading-relaxed max-w-2xl mx-auto">
              Build your dream team, compete with friends, and earn crypto rewards. 
              All powered by transparent smart contracts on the blockchain.
            </p>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <button
                onClick={handlePlayGame}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 text-lg"
              >
                {isConnected ? 'Play Game' : 'Get Started'}
              </button>
              <button className="px-8 py-4 bg-white text-gray-700 font-semibold rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-all duration-200 text-lg">
                Learn More
              </button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">⚽</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Build Your Team</h3>
              <p className="text-gray-600 leading-relaxed">
                Select your fantasy team of Premier League players and lock it securely on-chain before each gameweek.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Earn Points</h3>
              <p className="text-gray-600 leading-relaxed">
                Points are automatically calculated based on real match performances and recorded on-chain.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Win Rewards</h3>
              <p className="text-gray-600 leading-relaxed">
                Compete for crypto rewards. Top performers get paid automatically via smart contracts.
              </p>
            </div>
          </div>

          {/* Connect Section */}
          {!isConnected && (
            <div id="connect-section" className="mt-20 text-center">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-12 border border-blue-100">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Ready to Start Playing?
                </h2>
                <p className="text-gray-600 mb-8 text-lg">
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
