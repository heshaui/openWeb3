// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 < 0.9.0;

/**
整型运算
比较运算符： <=（小于等于）、<（小于） 、==（等于）、!=（不等于）、>=（大于等于）、>（大于）
位操作符： &（和）、|（或）、^（异或）、~（位取反）
算术操作符：+（加号）、-（减）、-（负号）、* （乘法）、/ （除法）, %（取余数）, **（幂）
移位： <<（左移位）、 >>（右移位）
 */

contract Test {
    //   1111 1111 => 255
    //   0000 0001 => 1
    // 1 0000 0000 => 0       
    // 二进制加法 1 + 1 = 10 进位 
    // 当溢出时0.5.0 返回0，0.8.0会报错，如果要溢出 加uncheked
    function add1() public pure returns(uint8) {
        unchecked {
            uint8 x = 128;
            uint8 y = x * 2;
            return y;
        }
    }

    // 二进制减法：1 - 1 = 0；1 - 0 = 1； 0 - 1 = 1 借位
    // 0000 0001 => 1
    // 0000 0010 => 2
    // 1111 1111 => 255        
    function sub1() public pure returns(uint8) {
        unchecked {
            uint8 x = 1;
            uint8 y = 2;
            return x - y;
        }
    }

    // 左移 <<
    // 0000 0011 => 3 左边位移两位
    // 0000 1100 => 12 
    function leftShift() public pure returns(uint8) {
        uint8 x = 3;
        uint8 y = 2;
        return x << y;
    }

    //    1111 1111 => 255 左边位移两位
    // 11 1111 1100 => 252 溢出不要
    function leftShift1() public pure returns(uint8) {
        uint8 x = 255;
        uint8 y = 2;
        return x << y;
    }

    // 右移 >>
    // 0000 1100 => 12 右边移动两位
    // 0000 0011 => 3
    function rightShift() public pure returns(uint8) {
        uint8 x = 12;
        uint8 y = 2;
        return x >> y;
    }

    // 按位与 & 两个都是1才是1，只要有0就是0
    //  0000 0111 => 7
    //  0000 0100 => 4
    //  0000 0100 => 4
    function and() public pure returns(uint8) {
        uint8 x = 7;
        uint8 y = 4;
        return x & y;
    }

    // 按位或 ｜ 只要有1就是1
    // 0000 1100 => 12
    // 0000 0001 => 1
    // 0000 1101 => 13
    function or() public pure returns(uint8) {
        uint8 x = 12;
        uint8 y = 1;
        return x | y;
    }

    // 异或 ^ 相同是0，不同是1
    // 0000 1100 => 12
    // 0000 0101 => 5
    // 0000 1001 => 9
    function xor() public pure returns(uint8) {
        uint8 x = 12;
        uint8 y = 5;
        return x ^ y;
    }

    // 按位取反 ～ 0变1 1变0
    function bitwiseNegationUint(uint256 num) public pure returns (uint256) {
        return ~num;
    }
}