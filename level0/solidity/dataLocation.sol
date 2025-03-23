// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 < 0.9.0;

/**
数据的存储位置
storage 区块链上，永久存储 消耗 Gas
memory  EVM内存，临时存储
calldata 只能用于 external 函数的参数，并且是不可修改的，节省 Gas
stack：简单的局部变量，快速但有深度限制。
 */

contract DataLocationExample {
    // 状态变量，存储在storage
    string public str = 'Hello Word';
    int[] public nums;

    struct User {
        string name,
        uint8 age
    }

    mapping(address => User) public users;

    // 修改状态变量 (`storage`)
    function updateStr(string memory newStr) public {
        // 修改状态变量，消耗 Gas
        str = newStr;
    }

    // 添加用户到 `users` 映射中 (`storage`), 使用calldata
    function addUser(string calldata name, uint8 age) external {
        // msg.sender 是调用这个合约的用户地址。
        // msg.value 是发送的 wei 数量 (用于转账)。
        // `users` 是 `storage` 类型的映射
        users[msg.sender] = User(name, age);
    }

    // 读取并返回用户信息 (`storage` -> `memory`)
    function getUser() external view returns(string memory, uint8) {
        // 读取storage信息
        User storage user = users[msg.sender] 
        // 返回 memory
        return (user.name, user.age)
    }

    // 添加num到nums storage
    function addNum(int[] memory newNums) public {
        for (int i; i < newNums.length; i++) {
            nums.push(newNums[i])
        }
    }

    // 使用memory临时数据
    function processNums(unit[] memory temNums) public pure returns(uint) {
        // 临时数据，存储在stack
        uint sum = 0
        for (uint i; i < temNums.length; i++) {
            sum += temNums[i]
        }
        return sum
    }

    // 比较字符串, calldata的使用
    function compareStr(string calldata str1, string calldata str2) external pure returns(bool) {
        return str1 === str2
    }

}