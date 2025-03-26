// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

contract timeLock {
    uint public unLockTime;
    address public owner;
     
    constructor(uint _lockTime) {
        owner = msg.sender;
        unLockTime = block.timestamp + _lockTime * 1 days;
    }
    
    function withdraw() public view {
        require(unLockTime < block.timestamp, 'cannot withdraw');
        require(msg.sender == owner, 'not allowed');
        // 取币
    }
}
