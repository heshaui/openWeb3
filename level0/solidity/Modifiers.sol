// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 < 0.9.0;

/**
用于限制或扩展函数的行为，例如：
onlyOwner 是一个修饰符，限制只有合约拥有者才能调用 changeOwner 函数。
_ 表示原函数的执行位置。
 */
contract Modifiers {
    modifier onlyOwner() {
        require(msg.sender == owner, "Not the contract owner");
        _;
    }

    function changeOwner(address newOwner) public onlyOwner {
        owner = newOwner;
    }
}