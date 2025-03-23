// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 < 0.9.0;

/**
solidity的值类型
int / uint: 有符号和无符号整数 (支持 int8 到 int256，每次增加 8 位)。
bool: 布尔类型 (true/false)
address: 表示以太坊地址 (20 字节)。
bytes: 固定长度或动态长度的字节数组 (bytes1 到 bytes32 / bytes)。
enum: 枚举,enum 是从 0 开始自动递增的整数类型
 */

/**
solidity的引用类型
数组
mapping:映射
struct： 结构体
string
 */

contract Type {
    // 基本类型
    int public num1 = -100;
    uint public num2 = 10;
    bool public flag = true;
    address public addr = 0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2;
    bytes public byts = 'hello';
    bytes32 public b32 = hex'1000';
    enum Status {
        Pendding, 
        Fulfilled，
        Rejected
    }
    Status public orderStatus = Status.Pendding;
    function setStatus(Status _status) public {
        orderStatus = _status
    }

    // 引用类型
    // 字符串
    string public name = 'hexi'
    // 数组
    int[] public nums1 = [-1, 1, 2]
    uint[] public nums2 = [1, 2, 3]
    bool[] public flags;
    address[] public adrs;
    function addNum(int num) public {
        nums1.push(num)
    }

    // 结构体
    struct Preson {
        uint8 age;
        string name;
    }
    Preson public p = Preson(20, 'hexi');

    // Mapping
    mapping(address => uint) public balances;
    function setMapData(address key, uint value) public {
        balances[key] = value
    }
}