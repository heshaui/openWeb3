// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

/**
关键字	         用法说明
is	            指定继承关系。
virtual	        允许函数在子合约中被重写。
override	    用于在子合约中重写父合约的函数。
abstract	    声明抽象合约，包含未实现的函数定义。
super	        调用父合约的函数（通常用于多重继承中的控制）。
*/

contract Parent {
    string public name;
    constructor(string memory _name) {
        name = _name;
    }
    function getName() external  virtual view returns(string memory) {
        return name;
    }
}

contract Children is Parent {
    string public childName;
    constructor(string memory _name, string memory _childName) Parent(_name) {
        childName = _childName;
    }
    function getName() public virtual override view returns(string memory) {
        return childName;
    }
}

contract A {
    function foo() public pure virtual returns (string memory) {
        return "A";
    }
}

contract B is A {
    function foo() public pure virtual override returns (string memory) {
        return "B";
    }
}

contract C is A {
    function foo() public pure virtual override returns (string memory) {
        return "C";
    }
}

// 多重继承
contract D is B, C {
    function foo() public pure override(B, C) returns (string memory) {
        return super.foo(); // 默认调用的是继承列表中最后一个的实现，即 C
    }
}

// 抽象合约的概念
// 如果一个合约中有未实现的函数，该合约必须标记为 abstract，这种合约不能部署。
// 抽象合约通常用作父合约。
// 纯虚函数
// 纯虚函数没有实现，用 virtual 关键字修饰，并且声明以分号 ; 结尾。

abstract contract Animal {
    function makeSound() public virtual returns (string memory);
}

contract Dog is Animal {
    function makeSound() public pure override returns (string memory) {
        return "Bark!";
    }
}