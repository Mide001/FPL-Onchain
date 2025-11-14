// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

/**
 * @title PlayerToken
 * @notice ERC20 token for individual players with Zora-style bonding curve mechanism
 * @dev Implements a bonding curve where price increases as more tokens are minted
 */
contract PlayerToken is ERC20, Ownable {
    using SafeERC20 for IERC20;

    // Bonding curve parameters
    uint256 public constant INITIAL_PRICE = 0.0001 ether; // Starting price per token
    uint256 public constant PRICE_INCREMENT = 0.00001 ether; // Price increase per token
    uint256 public constant MAX_SUPPLY = 1_000_000 * 10**18; // Maximum supply (1M tokens)
    
    // Payment token (USDC address - set by factory)
    IERC20 public paymentToken;
    
    // Player information
    string public playerName;
    uint256 public playerId;
    
    // Reserve tracking for bonding curve
    uint256 public reserve; // Total ETH/USDC in the curve
    
    // Events
    event TokensBought(address indexed buyer, uint256 amount, uint256 cost);
    event TokensSold(address indexed seller, uint256 amount, uint256 proceeds);
    event PlayerInfoSet(string playerName, uint256 playerId);

    constructor(
        string memory _name,
        string memory _symbol,
        address _paymentToken,
        address _owner
    ) ERC20(_name, _symbol) Ownable(_owner) {
        paymentToken = IERC20(_paymentToken);
    }

    /**
     * @notice Set player information (called by factory)
     */
    function setPlayerInfo(string memory _playerName, uint256 _playerId) external onlyOwner {
        playerName = _playerName;
        playerId = _playerId;
        emit PlayerInfoSet(_playerName, _playerId);
    }

    /**
     * @notice Calculate the current price for buying tokens
     * @param amount Amount of tokens to buy
     * @return totalCost Total cost in payment token
     */
    function getBuyPrice(uint256 amount) public view returns (uint256 totalCost) {
        require(amount > 0, "Amount must be greater than 0");
        require(totalSupply() + amount <= MAX_SUPPLY, "Exceeds max supply");
        
        // Linear bonding curve: price = INITIAL_PRICE + (totalSupply * PRICE_INCREMENT)
        uint256 currentSupply = totalSupply();
        uint256 averagePrice = INITIAL_PRICE + (currentSupply * PRICE_INCREMENT / 10**18);
        totalCost = (averagePrice * amount) / 10**18;
    }

    /**
     * @notice Calculate the proceeds from selling tokens
     * @param amount Amount of tokens to sell
     * @return totalProceeds Total proceeds in payment token
     */
    function getSellPrice(uint256 amount) public view returns (uint256 totalProceeds) {
        require(amount > 0, "Amount must be greater than 0");
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");
        
        uint256 currentSupply = totalSupply();
        require(currentSupply >= amount, "Cannot sell more than supply");
        
        // Calculate price based on supply after selling
        uint256 supplyAfter = currentSupply - amount;
        uint256 averagePrice = INITIAL_PRICE + (supplyAfter * PRICE_INCREMENT / 10**18);
        totalProceeds = (averagePrice * amount) / 10**18;
    }

    /**
     * @notice Buy tokens using the bonding curve
     * @param amount Amount of tokens to buy
     */
    function buyTokens(uint256 amount) external {
        require(amount > 0, "Amount must be greater than 0");
        require(totalSupply() + amount <= MAX_SUPPLY, "Exceeds max supply");
        
        uint256 cost = getBuyPrice(amount);
        require(cost > 0, "Invalid cost");
        
        // Transfer payment token from buyer
        paymentToken.safeTransferFrom(msg.sender, address(this), cost);
        
        // Update reserve
        reserve += cost;
        
        // Mint tokens to buyer
        _mint(msg.sender, amount);
        
        emit TokensBought(msg.sender, amount, cost);
    }

    /**
     * @notice Sell tokens back to the bonding curve
     * @param amount Amount of tokens to sell
     */
    function sellTokens(uint256 amount) external {
        require(amount > 0, "Amount must be greater than 0");
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");
        
        uint256 proceeds = getSellPrice(amount);
        require(proceeds > 0, "Invalid proceeds");
        require(paymentToken.balanceOf(address(this)) >= proceeds, "Insufficient reserves");
        
        // Burn tokens
        _burn(msg.sender, amount);
        
        // Update reserve
        reserve -= proceeds;
        
        // Transfer proceeds to seller
        paymentToken.safeTransfer(msg.sender, proceeds);
        
        emit TokensSold(msg.sender, amount, proceeds);
    }

    /**
     * @notice Get current token price (for 1 token)
     */
    function getCurrentPrice() external view returns (uint256) {
        if (totalSupply() == 0) {
            return INITIAL_PRICE;
        }
        return INITIAL_PRICE + (totalSupply() * PRICE_INCREMENT / 10**18);
    }

    /**
     * @notice Get reserve balance
     */
    function getReserve() external view returns (uint256) {
        return reserve;
    }
}

