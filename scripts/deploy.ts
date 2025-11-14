import hre from "hardhat";
const { ethers, network } = hre;

// Network mapping from flags to network names
const networkMap: Record<string, string> = {
  "--base": "base",
  "--base-sepolia": "base-sepolia",
  "--optimism": "optimism",
  "--optimism-sepolia": "optimism-sepolia",
  "--localhost": "localhost",
  "--local": "localhost",
};

// USDC addresses for different networks
const USDC_ADDRESSES: Record<string, string> = {
  base: process.env.BASE_USDC_ADDRESS || "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", // Base Mainnet USDC
  "base-sepolia": process.env.BASE_SEPOLIA_USDC_ADDRESS || "0x036CbD53842c5426634e7929541eC2318f3dCF7e", // Base Sepolia USDC
  optimism: process.env.OPTIMISM_USDC_ADDRESS || "0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85", // Optimism Mainnet USDC
  "optimism-sepolia": process.env.OPTIMISM_SEPOLIA_USDC_ADDRESS || "0x5fd84259d66Cd46123540766Be93DFE6D43130D7", // Optimism Sepolia USDC
  localhost: "0x0000000000000000000000000000000000000000", // Mock for localhost
  hardhat: "0x0000000000000000000000000000000000000000", // Mock for hardhat network
};

function getNetworkFromArgs(): string {
  const args = process.argv.slice(2);
  
  // Check for network flags
  for (const flag of Object.keys(networkMap)) {
    if (args.includes(flag)) {
      return networkMap[flag];
    }
  }
  
  // Fall back to Hardhat's network name if no flag provided
  return network.name;
}

async function main() {
  const networkName = getNetworkFromArgs();
  const usdcAddress = USDC_ADDRESSES[networkName] || USDC_ADDRESSES.localhost;
  
  console.log(`\n🚀 Deploying to: ${networkName}`);
  console.log(`💰 USDC Address: ${usdcAddress}\n`);

  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", ethers.formatEther(balance), "ETH\n");

  if (balance === 0n && networkName !== "localhost") {
    console.error("❌ Error: Account has no balance. Please fund your account first.");
    process.exit(1);
  }

  // Validate USDC contract
  if (usdcAddress !== "0x0000000000000000000000000000000000000000") {
    console.log("🔍 Validating USDC contract...");
    try {
      const code = await ethers.provider.getCode(usdcAddress);
      if (code === "0x") {
        console.error(`❌ Error: USDC address ${usdcAddress} is not a contract (no code found)`);
        console.error("   Please verify the USDC address is correct for", networkName);
        process.exit(1);
      }

      // Try to read ERC20 properties
      const erc20Abi = [
        "function symbol() view returns (string)",
        "function decimals() view returns (uint8)",
        "function totalSupply() view returns (uint256)",
        "function balanceOf(address) view returns (uint256)"
      ];
      
      const usdcContract = new ethers.Contract(usdcAddress, erc20Abi, deployer);
      
      try {
        const [symbol, decimals, totalSupply] = await Promise.all([
          usdcContract.symbol(),
          usdcContract.decimals(),
          usdcContract.totalSupply()
        ]);
        
        console.log(`   ✅ USDC Contract validated:`);
        console.log(`      Symbol: ${symbol}`);
        console.log(`      Decimals: ${decimals}`);
        console.log(`      Total Supply: ${ethers.formatUnits(totalSupply, decimals)} ${symbol}`);
        
        // Check deployer's USDC balance
        try {
          const usdcBalance = await usdcContract.balanceOf(deployer.address);
          console.log(`      Your Balance: ${ethers.formatUnits(usdcBalance, decimals)} ${symbol}`);
        } catch (e) {
          console.log(`      Your Balance: Could not read (this is okay)`);
        }
        console.log();
      } catch (e: any) {
        console.log(`   ⚠️  Warning: USDC contract exists but couldn't read properties`);
        console.log(`      This might be a non-standard ERC20. Proceeding anyway...\n`);
      }
    } catch (error: any) {
      console.error(`❌ Error validating USDC contract: ${error.message}`);
      console.error("   Please verify the USDC address is correct for", networkName);
      process.exit(1);
    }
  } else {
    console.log("⚠️  Using mock USDC address (localhost/testing)\n");
  }
  
  // Deploy PlayerTokenFactory
  console.log("📦 Deploying PlayerTokenFactory...");
  const Factory = await ethers.getContractFactory("PlayerTokenFactory");
  const factory = await Factory.deploy(usdcAddress, deployer.address);

  await factory.waitForDeployment();

  const factoryAddress = await factory.getAddress();
  console.log("✅ PlayerTokenFactory deployed to:", factoryAddress);

  // Example: Deploy a token for a player (optional - skip if USDC address is invalid)
  const createExampleToken = process.env.CREATE_EXAMPLE_TOKEN !== "false";
  
  if (createExampleToken) {
    try {
      const playerId = 1;
      const playerName = "Erling Haaland";
      const symbol = "HAALAND";

      console.log(`\n📦 Creating player token for ${playerName}...`);
      
      // Try to estimate gas first to get revert reason
      try {
        const gasEstimate = await factory.createPlayerToken.estimateGas(playerId, playerName, symbol);
        console.log(`   Gas estimate: ${gasEstimate.toString()}`);
      } catch (estimateError: any) {
        console.log(`   ⚠️  Gas estimation failed: ${estimateError.message}`);
        if (estimateError.data) {
          console.log(`   Revert data: ${estimateError.data}`);
        }
        // Try to decode the revert reason if available
        if (estimateError.reason) {
          console.log(`   Revert reason: ${estimateError.reason}`);
        }
      }
      
      const tx = await factory.createPlayerToken(playerId, playerName, symbol);
      console.log(`   Transaction hash: ${tx.hash}`);
      const receipt = await tx.wait();
      
      if (receipt) {
        const tokenAddress = await factory.getPlayerToken(playerId);
        console.log(`✅ PlayerToken for ${playerName} deployed to:`, tokenAddress);
      }
    } catch (error: any) {
      console.log("\n⚠️  Warning: Could not create example player token.");
      console.log("   Factory deployment was successful. You can create tokens manually later.");
      
      // Try to extract more detailed error information
      if (error.reason) {
        console.log(`   Revert reason: ${error.reason}`);
      }
      if (error.data) {
        console.log(`   Error data: ${error.data}`);
      }
      if (error.transaction) {
        console.log(`   Transaction: ${error.transaction.hash}`);
      }
      if (error.message) {
        console.log(`   Error message: ${error.message}`);
      }
      
      // Try to get the revert reason from the transaction
      if (error.transaction?.hash) {
        try {
          const tx = await ethers.provider.getTransaction(error.transaction.hash);
          if (tx) {
            const receipt = await ethers.provider.getTransactionReceipt(tx.hash);
            if (receipt && receipt.status === 0) {
              console.log(`   Transaction reverted. Checking logs for revert reason...`);
            }
          }
        } catch (e) {
          // Ignore errors when trying to get transaction details
        }
      }
    }
  }
  
  console.log("\n✨ Deployment complete!\n");
  console.log("📝 Next steps:");
  console.log(`   1. Factory address: ${factoryAddress}`);
  console.log(`   2. Use factory.createPlayerToken() to create player tokens`);
  console.log(`   3. Make sure USDC address is correct for ${networkName}\n`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

