# FPL-Onchain ⚽

A decentralized Fantasy Premier League application built on the blockchain. Play fantasy football, earn points based on real-world player performances, and get rewarded with on-chain tokens - all powered by smart contracts.

## 🎯 What is FPL-Onchain?

FPL-Onchain brings the excitement of Fantasy Premier League to the blockchain. Create your team, select players, and watch your points accumulate based on real match performances. All game logic, scoring, and rewards are handled transparently on-chain, ensuring fairness and trustlessness.

### Key Features

- 🏆 **On-Chain Team Management**: Create and manage your fantasy team directly on the blockchain
- 📊 **Real-Time Scoring**: Points are calculated and recorded on-chain based on actual Premier League match data
- 💰 **Crypto Rewards**: Earn tokens and rewards for your performance, all paid out automatically via smart contracts
- 🔒 **Transparent & Trustless**: All game rules and scoring are enforced by smart contracts - no central authority needed
- 🌐 **Web3 Integration**: Connect with your wallet using Reown AppKit and wagmi
- 📱 **Modern UI**: Built with Next.js 15 and React 19 for a smooth, responsive experience

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- A Web3 wallet (MetaMask, WalletConnect, etc.)
- A Reown Project ID (get one free at [Reown Dashboard](https://dashboard.reown.com))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Mide001/FPL-Onchain.git
   cd FPL-Onchain
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```bash
   cp .env.example .env
   ```
   
   Then add your Reown Project ID:
   ```env
   NEXT_PUBLIC_PROJECT_ID=your_project_id_here
   ```
   
   To get your Project ID:
   - Go to [Reown Dashboard](https://dashboard.reown.com)
   - Create a new project
   - Copy your Project ID and paste it in the `.env` file

4. **Run the development server**
   ```bash
   pnpm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **UI Library**: React 19
- **Web3**: 
  - [wagmi](https://wagmi.sh/) - React Hooks for Ethereum
  - [viem](https://viem.sh/) - TypeScript Ethereum library
  - [Reown AppKit](https://docs.reown.com/) - Wallet connection solution
- **Language**: TypeScript
- **Styling**: CSS Modules / Tailwind (if configured)

## 📖 How It Works

1. **Connect Your Wallet**: Use the connect button to link your Web3 wallet
2. **Create Your Team**: Select your fantasy team of Premier League players
3. **Lock Your Team**: Submit your team on-chain before the gameweek deadline
4. **Earn Points**: Points are automatically calculated based on real match performances
5. **Claim Rewards**: Collect your on-chain rewards based on your performance

## 🏗️ Project Structure

```
FPL-Onchain/
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── components/       # React components
│   ├── config/           # Configuration files
│   ├── context/          # React context providers
│   └── hooks/            # Custom React hooks
├── public/               # Static assets
└── .env.example          # Environment variables template
```

## 🔧 Available Scripts

- `pnpm run dev` - Start development server
- `pnpm run build` - Build for production
- `pnpm run start` - Start production server
- `pnpm run lint` - Run ESLint

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🔗 Resources

- [Reown Documentation](https://docs.reown.com)
- [Next.js Documentation](https://nextjs.org/docs)
- [wagmi Documentation](https://wagmi.sh)
- [viem Documentation](https://viem.sh)

## 💬 Support

If you have any questions or need help, please open an issue on GitHub.

---

**Built with ❤️ for football and blockchain enthusiasts**
