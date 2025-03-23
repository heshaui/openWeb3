// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 < 0.9.0;


// 方法	           用途	                             特点	                消耗
// require()	输入验证、访问控制等普通错误处理	返回错误信息；退还未使用的 gas	低
// revert()	复杂条件下的错误处理或自定义错误调用	通常与 if 配合使用；节省 gas	低
// assert()	用于检测逻辑上永远不应发生的错误	消耗所有 gas；应谨慎使用	      高
// error	自定义错误类型，配合 revert 使用	节省 gas；支持参数传递	        低

contract Error {
    // require
    function testRequire(uint8 a) public pure returns(uint8) {
        require (a > 10, 'a must be greater than 10');
        return a;
    }

    // revert
    function testRevert(uint8 a, uint8 b) public pure {
        if (a < b) {
            revert('a must greater than b');
        }
    }

    // assert
    function testAssert(uint256 a, uint256 b) public pure {
        uint256 total = a + b;
        assert(a > total);
    }

    // error 
    error testError(uint8 num1, uint8 num2);
    function testError(uint8 a, uint8 b) public pure {
        if (a < b) {
            revert testError(a, b);
        }
    }
}