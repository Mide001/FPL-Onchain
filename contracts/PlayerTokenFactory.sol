// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./PlayerToken.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title PlayerTokenFactory
 * @notice Factory contract to deploy PlayerToken contracts for each player
 * @dev Uses CREATE2 for deterministic addresses
 */
contract PlayerTokenFactory is Ownable {
    // Mapping from player ID to token address
    mapping(uint256 => address) public playerTokens;
    
    // Mapping from token address to player ID
    mapping(address => uint256) public tokenToPlayerId;
    
    // Array of all deployed token addresses
    address[] public allTokens;
    
    // Payment token address (USDC)
    address public immutable paymentToken;
    
    // Events
    event PlayerTokenCreated(
        uint256 indexed playerId,
        string playerName,
        address indexed tokenAddress,
        string symbol
    );
    
    event PaymentTokenUpdated(address oldToken, address newToken);

    constructor(address _paymentToken, address _owner) Ownable(_owner) {
        require(_paymentToken != address(0), "Invalid payment token");
        paymentToken = _paymentToken;
    }

    /**
     * @notice Deploy a new PlayerToken for a player
     * @param playerId Unique identifier for the player
     * @param playerName Name of the player
     * @param symbol Token symbol (e.g., "HAALAND", "SALAH")
     * @return tokenAddress Address of the deployed token
     */
    function createPlayerToken(
        uint256 playerId,
        string memory playerName,
        string memory symbol
    ) external returns (address tokenAddress) {
        require(playerTokens[playerId] == address(0), "Token already exists for this player");
        require(bytes(playerName).length > 0, "Player name required");
        require(bytes(symbol).length > 0, "Symbol required");
        
        // Create token name
        string memory tokenName = string(abi.encodePacked(playerName, " Token"));
        
        // Deploy new PlayerToken
        // Set owner to this factory contract so it can call setPlayerInfo
        PlayerToken token = new PlayerToken(
            tokenName,
            symbol,
            paymentToken,
            address(this)
        );
        
        tokenAddress = address(token);
        
        // Set player info (factory is the owner, so this will work)
        token.setPlayerInfo(playerName, playerId);
        
        // Store mappings
        playerTokens[playerId] = tokenAddress;
        tokenToPlayerId[tokenAddress] = playerId;
        allTokens.push(tokenAddress);
        
        emit PlayerTokenCreated(playerId, playerName, tokenAddress, symbol);
        
        return tokenAddress;
    }

    /**
     * @notice Get token address for a player
     * @param playerId Player ID
     * @return tokenAddress Token address (address(0) if not created)
     */
    function getPlayerToken(uint256 playerId) external view returns (address tokenAddress) {
        return playerTokens[playerId];
    }

    /**
     * @notice Check if a token exists for a player
     * @param playerId Player ID
     * @return exists True if token exists
     */
    function tokenExists(uint256 playerId) external view returns (bool exists) {
        return playerTokens[playerId] != address(0);
    }

    /**
     * @notice Get total number of deployed tokens
     * @return count Number of tokens
     */
    function getTokenCount() external view returns (uint256 count) {
        return allTokens.length;
    }

    /**
     * @notice Get all token addresses
     * @return tokens Array of token addresses
     */
    function getAllTokens() external view returns (address[] memory tokens) {
        return allTokens;
    }

    /**
     * @notice Get token addresses for multiple player IDs
     * @param playerIds Array of player IDs
     * @return tokenAddresses Array of token addresses
     */
    function getPlayerTokens(uint256[] calldata playerIds)
        external
        view
        returns (address[] memory tokenAddresses)
    {
        tokenAddresses = new address[](playerIds.length);
        for (uint256 i = 0; i < playerIds.length; i++) {
            tokenAddresses[i] = playerTokens[playerIds[i]];
        }
    }
}

