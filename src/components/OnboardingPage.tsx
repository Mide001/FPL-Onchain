'use client'

import { ConnectButton } from "@/components/ConnectButton";
import Image from 'next/image';

export const OnboardingPage = () => {
  return (
    <div className="onboarding-container">
      <div className="onboarding-hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Welcome to <span className="gradient-text">FPL-Onchain</span>
          </h1>
          <p className="hero-subtitle">
            Play Fantasy Premier League on the blockchain. Build your dream team, earn points, and get rewarded with crypto - all on-chain.
          </p>
        </div>
      </div>

      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">⚽</div>
          <h3>Build Your Team</h3>
          <p>Select your fantasy team of Premier League players and lock it on-chain</p>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon">📊</div>
          <h3>Earn Points</h3>
          <p>Points are calculated automatically based on real match performances</p>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon">💰</div>
          <h3>Get Rewarded</h3>
          <p>Win crypto rewards for your performance, paid out automatically</p>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon">🔒</div>
          <h3>Fully Transparent</h3>
          <p>All game rules and scoring are enforced by smart contracts</p>
        </div>
      </div>

      <div className="cta-section">
        <h2 className="cta-title">Ready to Play?</h2>
        <p className="cta-subtitle">Connect your wallet to get started</p>
        <div className="connect-wrapper">
          <ConnectButton />
        </div>
      </div>
    </div>
  );
};

