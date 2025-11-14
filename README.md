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
   
   Then add your configuration:
   ```env
   # Frontend
   NEXT_PUBLIC_PROJECT_ID=your_project_id_here
   
   # Smart Contract Deployment (optional - for deploying contracts)
   PRIVATE_KEY=your_private_key_here
   GUARDIAN_API_KEY=your_guardian_api_key_here
   SPORTMONKS_API_TOKEN=your_sportmonks_token_here
   ```
   
   To get your Reown Project ID:
   - Go to [Reown Dashboard](https://dashboard.reown.com)
   - Create a new project
   - Copy your Project ID and paste it in the `.env` file
   
   **Note**: Only add `PRIVATE_KEY` if you plan to deploy contracts. Never commit your `.env` file!

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
├── contracts/            # Solidity smart contracts
│   ├── PlayerToken.sol   # ERC20 token with bonding curve for players
│   └── PlayerTokenFactory.sol  # Factory to deploy player tokens
├── scripts/              # Deployment scripts
│   └── deploy.ts         # Contract deployment script
├── test/                 # Contract tests
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── components/       # React components
│   ├── config/           # Configuration files
│   ├── context/          # React context providers
│   └── hooks/            # Custom React hooks
├── public/               # Static assets
└── .env.example          # Environment variables template
```

## 📜 Smart Contracts

### Base Sepolia Testnet Deployment

**Network**: Base Sepolia (Chain ID: 84532)

**Deployed Contracts**:
- **PlayerTokenFactory**: `0xCAB1FaDab790C4960fEbB792AEF31fA6a0c1D404`
- **Example Player Token (Erling Haaland)**: `0x5536F00b643273a8e4849183e7365Ce2107b7eac`

**USDC Address**: `0x036CbD53842c5426634e7929541eC2318f3dCF7e`

**Explorer Links**:
- Factory: [View on Basescan](https://sepolia.basescan.org/address/0xCAB1FaDab790C4960fEbB792AEF31fA6a0c1D404)
- Example Token: [View on Basescan](https://sepolia.basescan.org/address/0x5536F00b643273a8e4849183e7365Ce2107b7eac)

### Contract Features

- **PlayerToken**: ERC20 token with Zora-style bonding curve mechanism
  - Buy/sell tokens with automatic price discovery
  - Linear bonding curve: price increases as supply increases
  - Maximum supply: 1M tokens per player
  
- **PlayerTokenFactory**: Factory contract to deploy player tokens
  - Creates unique tokens for each player
  - Tracks all deployed tokens
  - Manages player-to-token mappings

### Deploying Contracts

1. **Set up environment variables**
   
   Add to your `.env` file:
   ```env
   PRIVATE_KEY=your_private_key_here
   BASE_SEPOLIA_RPC_URL=https://sepolia.base.org  # Optional, has default
   BASE_SEPOLIA_USDC_ADDRESS=0x036CbD53842c5426634e7929541eC2318f3dCF7e  # Optional, has default
   ```

2. **Compile contracts**
   ```bash
   npm run compile
   ```

3. **Deploy to Base Sepolia**
   ```bash
   npm run deploy:base-sepolia
   ```

4. **Other deployment options**
   ```bash
   npm run deploy:base              # Base Mainnet
   npm run deploy:optimism          # Optimism Mainnet
   npm run deploy:optimism-sepolia  # Optimism Sepolia
   npm run deploy:local             # Local Hardhat node
   ```

### Running Tests

```bash
npm run test:contracts
```

## 🔧 Available Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Smart Contracts
- `npm run compile` - Compile Solidity contracts
- `npm run test:contracts` - Run contract tests
- `npm run deploy:base-sepolia` - Deploy to Base Sepolia testnet
- `npm run deploy:base` - Deploy to Base Mainnet
- `npm run deploy:optimism` - Deploy to Optimism Mainnet
- `npm run deploy:optimism-sepolia` - Deploy to Optimism Sepolia testnet
- `npm run deploy:local` - Deploy to local Hardhat node
- `npm run node` - Start local Hardhat node

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
