import { expect } from "chai";
import { ethers } from "hardhat";

describe("PlayerTokenFactory", () => {
  async function deployFixture() {
    const [owner, other] = await ethers.getSigners();
    const MockERC20 = await ethers.getContractFactory("MockERC20");
    const paymentToken = await MockERC20.deploy("Mock USDC", "mUSDC", 18);
    await paymentToken.waitForDeployment();

    const Factory = await ethers.getContractFactory("PlayerTokenFactory");
    const factory = await Factory.deploy(await paymentToken.getAddress(), owner.address);
    await factory.waitForDeployment();
    return { owner, other, paymentToken, factory };
  }

  it("creates a player token and sets mappings", async () => {
    const { owner, factory, paymentToken } = await deployFixture();
    const playerId = 10;
    const name = "Bukayo Saka";
    const symbol = "SAKA";

    await expect(factory.createPlayerToken(playerId, name, symbol))
      .to.emit(factory, "PlayerTokenCreated");

    const tokenAddr = await factory.playerTokens(playerId);
    expect(tokenAddr).to.not.equal(ethers.ZeroAddress);

    const tokenCtr = await ethers.getContractAt("PlayerToken", tokenAddr);
    expect(await tokenCtr.playerName()).to.equal(name);
    expect(await tokenCtr.playerId()).to.equal(BigInt(playerId));
    expect(await tokenCtr.paymentToken()).to.equal(await paymentToken.getAddress());

    // Owner should be the caller (owner)
    expect(await tokenCtr.owner()).to.equal(owner.address);

    // Reverse mapping
    expect(await factory.tokenToPlayerId(tokenAddr)).to.equal(BigInt(playerId));

    // All tokens array and count
    const count = await factory.getTokenCount();
    expect(count).to.equal(1n);
    const all = await factory.getAllTokens();
    expect(all.length).to.equal(1);
    expect(all[0]).to.equal(tokenAddr);
  });
});


