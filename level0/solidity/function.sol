// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 < 0.9.0;

/*
函数可见性 (Visibility)
public: 外部、内部都可调用。
external: 只能外部调用。
internal: 仅限于当前合约或继承的合约调用。
private: 仅限于当前合约内调用。
 */

/*
函数状态 (State Mutability)
view: 不修改区块链状态，只读取数据。
pure: 不修改区块链状态，也不读取链上数据。
payable: 允许接收以太币的函数。
default: 读写
 */
contract FnDemo {
    bool public flag = false;
    // public、pure
    function publicFn() public pure returns(int) {
        int num = 0;
        return num;
    }
    // external、view
    function externalFn() external view returns(bool) {
        return flag;
    }
    // private、 default
    function privateFn(int val) private {
        if (val < 10) {
            flag = true;
        }
    }
}