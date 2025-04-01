// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

/**
需求：存钱罐
就是所有人都可以往存钱罐里存钱，只有一个人能取钱，取钱之后存钱罐就销毁了
 */
contract SaveBank {
    // 定义只能取钱的人的地址
    address public immutable owner;
    // 定义存钱事件
    event ReceiveETH(address indexed sender, uint256 amount);
    event ReceiveERC20(address indexed sender, address token, uint256 amount);
    event ReceiveERC721(address indexed sender, address token, uint256 tokenId);
    // 定义取钱事件
    event Withdraw(address indexed owner);
    event Destroyed();

    // 初始化owner
    constructor() {
        owner = msg.sender;
    }

    // 定义修饰符，限制只能owner才能取钱，否则报错
    modifier onlyOwner() {
        require(msg.sender == owner, 'Only owner can call this function');
        _;
    }

    // 存钱ETH
    function receiveETH() external payable {
        emit ReceiveETH(msg.sender, msg.value);
    }
    // 存ERC20
    function receiveERC20(address tokenAddress, uint256 amount) external {
        IERC20 token = IERC20(tokenAddress);
        require(token.transferForm(msg.sender, address(this), amount), 'ERC20 transfer failed');
        emit ReceivedERC20(msg.sender, tokenAddress, amount);
    }
    // 存ERC721
    function receiveERC721(address tokenAddress, uint256 tokenId) external {
        IERC721 token = IERC721(tokenAddress);
        token.transferForm(msg.sender, address(this), tokenId);
        emit ReceiveERC721(msg.sender, tokenAddress, tokenId);
    }

    // 取钱
    function withdraw() external onlyOwner {
        // 提取ETH
        uint256 ethBalance = address(this).balance;
        if (ethBalance > 0) {
            payable(owner).transfer(ethBalance);
        }
        
        emit Withdrawn(owner);
        emit Destroyed();
        
        // 销毁合约
        selfdestruct(payable(owner));
    }

    // 查询合约持有的ERC20余额
    function getERC20Balance(address tokenAddress) external view returns (uint256) {
        return IERC20(tokenAddress).balanceOf(address(this));
    }
    
    // 查询合约是否持有特定ERC721代币
    function holdsERC721(address tokenAddress, uint256 tokenId) external view returns (bool) {
        return IERC721(tokenAddress).ownerOf(tokenId) == address(this);
    }
}