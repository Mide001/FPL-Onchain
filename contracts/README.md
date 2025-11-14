# FPL-Onchain Smart Contracts

This directory contains the smart contracts for the FPL-Onchain application, implementing a factory pattern for deploying player tokens with Zora-style bonding curve mechanism.

## Contracts

### PlayerTokenFactory.sol
Factory contract that deploys `PlayerToken` contracts for each Premier League player.

**Key Features:**
- Deploys a unique ERC20 token for each player
- Tracks all deployed tokens
- Provides lookup functions for player tokens

**Main Functions:**
- `createPlayerToken(playerId, playerName, symbol)` - Deploy a new token for a player
- `getPlayerToken(playerId)` - Get token address for a player
- `tokenExists(playerId)` - Check if token exists for a player

### PlayerToken.sol
ERC20 token contract with Zora-style bonding curve mechanism for automatic liquidity.

**Key Features:**
- Linear bonding curve pricing
- Buy/sell tokens directly from the contract
- Automatic price discovery based on supply
- Uses USDC as payment token

**Bonding Curve Mechanism:**
- Price formula: `price = INITIAL_PRICE + (supply * PRICE_INCREMENT)`
- As more tokens are bought, price increases
- As tokens are sold, price decreases
- Provides automatic liquidity without external AMM

**Main Functions:**
- `buyTokens(amount)` - Buy tokens using USDC
- `sellTokens(amount)` - Sell tokens back to the curve
- `getBuyPrice(amount)` - Calculate cost to buy tokens
- `getSellPrice(amount)` - Calculate proceeds from selling tokens
- `getCurrentPrice()` - Get current price per token

## Deployment

1. **Compile contracts:**
   ```bash
   npx hardhat compile
   ```

2. **Deploy factory:**
   ```bash
   npx hardhat run scripts/deploy.ts --network <network>
   ```

3. **Create player tokens:**
   ```solidity
   factory.createPlayerToken(1, "Erling Haaland", "HAALAND");
   factory.createPlayerToken(2, "Mohamed Salah", "SALAH");
   ```

## Usage Example

```solidity
// Get factory instance
PlayerTokenFactory factory = PlayerTokenFactory(factoryAddress);

// Create token for a player
factory.createPlayerToken(1, "Erling Haaland", "HAALAND");

// Get token address
address haalandToken = factory.getPlayerToken(1);

// Interact with token
PlayerToken token = PlayerToken(haalandToken);

// Buy tokens
uint256 amount = 1000 * 10**18; // 1000 tokens
uint256 cost = token.getBuyPrice(amount);
IERC20(usdc).approve(haalandToken, cost);
token.buyTokens(amount);

// Sell tokens
token.sellTokens(500 * 10**18); // Sell 500 tokens
```

## Bonding Curve Parameters

- `INITIAL_PRICE`: 0.0001 ether (starting price)
- `PRICE_INCREMENT`: 0.00001 ether (price increase per token)
- `MAX_SUPPLY`: 1,000,000 tokens

These can be adjusted in `PlayerToken.sol` based on your requirements.

## Security Considerations

- Uses OpenZeppelin's battle-tested contracts
- Implements proper access control
- Uses SafeERC20 for token transfers
- Includes input validation and overflow protection

## Testing

Run tests with:
```bash
npx hardhat test
```

## Network Configuration

Update `hardhat.config.ts` with your network settings:
- Mainnet
- Testnets (Sepolia, Goerli, etc.)
- Local development (Hardhat Network)

