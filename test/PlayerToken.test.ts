import { expect } from "chai";
import { ethers } from "hardhat";

describe("PlayerToken", () => {
  const ONE = ethers.parseEther("1");

  async function deployFixture() {
    const [deployer, user] = await ethers.getSigners();

    const MockERC20 = await ethers.getContractFactory("MockERC20");
    const paymentToken = await MockERC20.deploy("Mock USDC", "mUSDC", 18);
    await paymentToken.waitForDeployment();

    const PlayerToken = await ethers.getContractFactory("PlayerToken");
    const playerToken = await PlayerToken.deploy(
      "Erling Haaland Token",
      "HAALAND",
      await paymentToken.getAddress(),
      deployer.address
    );
    await playerToken.waitForDeployment();

    // Fund user with payment tokens
    await paymentToken.mint(user.address, ethers.parseEther("1000"));

    return { deployer, user, paymentToken, playerToken };
  }

  it("computes initial buy price correctly", async () => {
    const { playerToken } = await deployFixture();
    const price = await playerToken.getBuyPrice(ONE);
    const INITIAL_PRICE = await playerToken.INITIAL_PRICE();
    expect(price).to.equal(INITIAL_PRICE);
  });

  it("allows buying tokens and updates reserve and balances", async () => {
    const { user, paymentToken, playerToken } = await deployFixture();

    const amount = ethers.parseEther("10");
    const cost = await playerToken.getBuyPrice(amount);

    await paymentToken.connect(user).approve(await playerToken.getAddress(), cost);
    const reserveBefore = await playerToken.getReserve();
    const balBefore = await playerToken.balanceOf(user.address);

    await expect(playerToken.connect(user).buyTokens(amount))
      .to.emit(playerToken, "TokensBought")
      .withArgs(user.address, amount, cost);

    expect(await playerToken.getReserve()).to.equal(reserveBefore + cost);
    expect(await playerToken.balanceOf(user.address)).to.equal(balBefore + amount);
    expect(await paymentToken.balanceOf(await playerToken.getAddress())).to.equal(cost);
  });

  it("allows selling tokens and pays out from reserve", async () => {
    const { user, paymentToken, playerToken } = await deployFixture();

    const amount = ethers.parseEther("10");
    const cost = await playerToken.getBuyPrice(amount);
    await paymentToken.connect(user).approve(await playerToken.getAddress(), cost);
    await playerToken.connect(user).buyTokens(amount);

    const sellAmount = ethers.parseEther("4");
    const proceeds = await playerToken.connect(user).getSellPrice(sellAmount);

    const reserveBefore = await playerToken.getReserve();
    const userPayTokenBefore = await paymentToken.balanceOf(user.address);
    const contractPayTokenBefore = await paymentToken.balanceOf(await playerToken.getAddress());

    await expect(playerToken.connect(user).sellTokens(sellAmount))
      .to.emit(playerToken, "TokensSold")
      .withArgs(user.address, sellAmount, proceeds);

    expect(await playerToken.getReserve()).to.equal(reserveBefore - proceeds);
    expect(await paymentToken.balanceOf(user.address)).to.equal(userPayTokenBefore + proceeds);
    expect(await paymentToken.balanceOf(await playerToken.getAddress())).to.equal(contractPayTokenBefore - proceeds);
  });

  it("reverts when exceeding max supply", async () => {
    const { user, paymentToken, playerToken } = await deployFixture();
    const maxSupply = await playerToken.MAX_SUPPLY();
    const cost = await playerToken.getBuyPrice(maxSupply);
    await paymentToken.connect(user).approve(await playerToken.getAddress(), cost);
    await expect(playerToken.connect(user).buyTokens(maxSupply)).to.be.revertedWith("Exceeds max supply");
  });
});


