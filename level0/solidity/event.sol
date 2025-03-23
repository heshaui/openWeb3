// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 < 0.9.0;

// event 的特点
// emit 关键字： 触发事件时使用。
// indexed 关键字： 可为事件参数添加 indexed 标记，最多支持 3 个 indexed 参数。
// 用于 过滤查询。
// 非 indexed 参数不能被查询，但仍会记录在交易日志中。
// Gas 消耗： 事件比存储数据便宜，适合做日志记录或状态改变通知。
// Logs： 事件不会被链上合约读取（只能通过外部客户端监听，如 Web3.js、Ethers.js 等）。
// 流程： 触发事件后，前端监听testEvent事件，得到值

contract EventExample {
    // 定义事件
    event testEvent(address indexed form, uint256 num);
    uint256 num = 0;
    // 触发事件
    function addNum(uint256 val) public {
        num += val;
        emit testEvent(msg.sender, num);
    }
}