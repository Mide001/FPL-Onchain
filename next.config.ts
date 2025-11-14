import type { NextConfig } from "next";
import webpack from "webpack";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'resources.premierleague.com',
      },
      {
        protocol: 'https',
        hostname: 'img.a.transfermarkt.technology',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      },
      {
        protocol: 'https',
        hostname: 'backend.liverpoolfc.com',
      },
      {
        protocol: 'https',
        hostname: 'www.arsenal.com',
      },
      {
        protocol: 'https',
        hostname: 'cryptologos.cc',
      },
      {
        protocol: 'https',
        hostname: 'ichef.bbci.co.uk',
      },
      {
        protocol: 'https',
        hostname: 'e0.365dm.com',
      },
      {
        protocol: 'https',
        hostname: 'www.skysports.com',
      },
      {
        protocol: 'https',
        hostname: 'skysports.com',
      },
      {
        protocol: 'https',
        hostname: 'bbci.co.uk',
      },
      // Sportmonks image CDNs (add common hosts used for thumbnails)
      {
        protocol: 'https',
        hostname: 'media.api-sportmonks.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sportmonks.com',
      },
      {
        protocol: 'https',
        hostname: 'images.sportmonks.com',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding')
    
    // Fix for MetaMask SDK trying to import React Native modules
    config.resolve.fallback = {
      ...config.resolve.fallback,
      '@react-native-async-storage/async-storage': false,
    };
    
    // Ignore React Native modules in webpack
    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /^@react-native-async-storage\/async-storage$/,
      })
    );
    
    return config
  }
};

export default nextConfig;
