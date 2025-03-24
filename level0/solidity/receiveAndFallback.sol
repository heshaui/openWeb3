// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

contract ReceiveDemo {
    /**
    receive() 函数
    专门用于接收 纯以太币转账（没有附带任何 calldata）。
    如果合约接收以太币时调用的数据为空（比如 address(this).transfer() 或 address(this).send()），就会触发 receive() 函数。
    */
    event Receive(address sender, uint amount);
    // reserve 必须有external 与 payable
    receive() external payable {
        emit Receive(msg.sender, msg.value);
    }
}

contract FallbackDemo {
    /**
    fallback() 函数
    用于处理：
    调用不存在的函数。
    发送以太币但没有定义 receive() 函数时。
    比 receive() 更通用。
    如果接收以太币时 receive() 不存在或 msg.data 不为空时，会触发 fallback()
    */
    // 一般形式 (不接受以太币)
    // fallback() external {
    //     // 处理不存在的函数调用
    // }

    // // 可以接收以太币的形式
    // fallback() external payable {
    //     // 自定义逻辑
    // }
    event FallbackTriggered(address sender, uint amount, bytes data);
    fallback() external payable { 
        emit FallbackTriggered(msg.sender, msg.value, msg.data);
    }
}
