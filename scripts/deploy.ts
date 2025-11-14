import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await ethers.provider.getBalance(deployer.address)).toString());

  // For testing, we'll use a mock USDC address
  // In production, use the actual USDC address for your network
  const MOCK_USDC = "0x0000000000000000000000000000000000000000"; // Replace with actual USDC address
  
  // Deploy PlayerTokenFactory
  const Factory = await ethers.getContractFactory("PlayerTokenFactory");
  const factory = await Factory.deploy(MOCK_USDC, deployer.address);

  await factory.waitForDeployment();

  const factoryAddress = await factory.getAddress();
  console.log("PlayerTokenFactory deployed to:", factoryAddress);

  // Example: Deploy a token for a player
  const playerId = 1;
  const playerName = "Erling Haaland";
  const symbol = "HAALAND";

  const tx = await factory.createPlayerToken(playerId, playerName, symbol);
  await tx.wait();

  const tokenAddress = await factory.getPlayerToken(playerId);
  console.log(`PlayerToken for ${playerName} deployed to:`, tokenAddress);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

