// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

contract GlobalVariable {
    // 区块属性
    bytes32 public hash;
    address public miner;
    uint public difficulty;
    uint public gaslimit;
    uint public blockNumber;
    uint public timestamp;

    // 交易属性
    uint256 public gasleftVal;
    bytes public msgData;
    address public sender;
    uint public msgvalue;
    bytes4 public sig;
    uint256 public gaspriceVal;
    address public origin;

    // abi编码
    bytes public encodedData;
    bytes public encodePacked;
    bytes4 private selector = bytes4(keccak256("transfer(address,uint256)")); 
    bytes public encodeWithSelector;
    string private signature = "transfer(address,uint256)";
    bytes public encodeWithSignature;

    // abi解码
    uint public params1;
    address public params2;

    // 数学函数
    uint public addmodResult;
    uint public mulmodResult;

    // 加密算法
    bytes32 public keccak256Hash;
    bytes32 public sha256Hash;
    bytes20 public ripemd160Hash;

    // 椭圆曲线签名恢复
    address public signer;
    constructor() payable  {
        // require(block.number > blockNumber && block.number <= blockNumber + 256, 'Block number out of range');
        // 区块属性
        // 1、blockhash(uint blockNumber) returns (bytes32)：返回指定区块的哈希值，blockNumber 仅支持最近的 256 个区块，且不包括当前区块。
        hash = blockhash(1);
        // 2、block.coinbase (address)：返回挖出当前区块的矿工地址。
        miner = block.coinbase;
        // block.difficulty (uint)：返回当前区块的难度。 ——已废弃
        // difficulty = block.difficulty;
        // 3、block.prevrandao：返回的是一个基于信标链的随机数 (pseudo-random number)。
        difficulty = block.prevrandao;
        // 4、block.gaslimit (uint)：返回当前区块的 Gas 上限。
        gaslimit = block.gaslimit;
        // 5、block.number (uint)：返回当前区块号。
        blockNumber = block.number;
        // 6、block.timestamp (uint)：返回当前区块的时间戳（单位：秒）。常用于时间条件判断。
        timestamp = block.timestamp;    

        // 交易属性
        // 1 、gasleft() returns (uint256)：返回当前合约执行剩余的 Gas 数量。
        gasleftVal = gasleft();
        // 2、msg.data (bytes)：返回当前调用的完整 calldata。
        msgData = msg.data;
        // 3、msg.sender (address)：返回当前调用的发送者地址。
        sender = msg.sender;
        // 4、msg.value (uint)：返回此次调用发送的以太币数量（单位：wei）。
        msgvalue = msg.value;
        // 5、msg.sig (bytes4)：返回当前调用的函数选择器。
        sig = msg.sig;
        // 6、tx.gasprice (uint)：返回当前交易的 Gas 价格。
        gaspriceVal = tx.gasprice;
        // 7、tx.origin (address payable)：返回交易的最初发起者地址。如果只有一个调用，tx.origin 与 msg.sender 相同；否则，tx.origin 始终是最初的交易发起者。
        origin = tx.origin;

        // abi编码属性
        // 1、abi.encode(...) returns (bytes)：对输入的参数进行 ABI 编码，返回字节数组。
        encodedData = abi.encode(uint(1), address(0x123));
        // 2、abi.encodePacked(...) returns (bytes)：将多个参数进行紧密打包编码，不填充到 32 字节。适用于哈希计算。
        encodePacked = abi.encodePacked(uint(1), address(0x123));
        // 3、abi.encodeWithSelector(bytes4 selector, ...) returns (bytes)：将参数编码，并在前面加上函数选择器（用于外部调用）。
        encodeWithSelector = abi.encodeWithSelector(selector, uint(1), address(0x123));
        // 4、abi.encodeWithSignature(string signature, ...) returns (bytes)：通过函数签名生成函数选择器，并将参数编码。 
        encodeWithSignature = abi.encodeWithSignature(signature, 1, address(0x123));

        // abi解码
        // abi.decode(bytes memory encodedData, (...)) returns (...)：对编码的数据进行解码，返回解码后的参数。
        (params1, params2) = abi.decode(encodedData, (uint, address));

        // 数学函数
        // 1、addmod(uint x, uint y, uint k) returns (uint)：计算 (x + y) % k，在任意精度下执行加法再取模，支持大数运算。
        addmodResult = addmod(10, 20, 3);
        // 2、mulmod(uint x, uint y, uint k) returns (uint)：计算 (x * y) % k，先进行乘法再取模。
        mulmodResult = mulmod(10, 20, 3);
        // 密码学哈希函数
        // 1、keccak256(bytes memory) returns (bytes32)：使用 Keccak-256 算法计算哈希值（以太坊的主要哈希算法）。
        keccak256Hash = keccak256(encodePacked);
        // 2、sha256(bytes memory) returns (bytes32)：计算 SHA-256 哈希值。
        sha256Hash = sha256(encodePacked);
        // 3、ripemd160(bytes memory) returns (bytes20)：计算 RIPEMD-160 哈希值，生成较短的 20 字节哈希值。
        ripemd160Hash = ripemd160(encodePacked);
        // 椭圆曲线签名恢复
        // ecrecover(bytes32 hash, uint8 v, bytes32 r, bytes32 s) returns (address)：通过椭圆曲线签名恢复公钥对应的地址，常用于验证签名。
        signer = ecrecover(keccak256Hash, 10, sha256Hash, ripemd160Hash);
    }
}

// 验证哈希是否相等
contract VerifierHash {
    bytes32 public hash;

    function setHash(uint input) public  {
        hash = keccak256(abi.encode(input));
    }

    function verifierHash(uint input) public view returns(bool) {
        return keccak256(abi.encode(input)) == hash;
    }
}
