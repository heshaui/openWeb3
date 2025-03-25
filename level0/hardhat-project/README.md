# Hardhat 部署合约文档

### 1、npx hardhat 创建项目
### 2、npx hardhat compile 编译项目
### 3、npx hardhat node 启动本地网络
这里我们先将合约部署到hardhat 内置的本地网络，启动本地网络：npx hardhat node 启动成功后会生成20个账号已经对应的私钥(这里的窗口暂时不能退出，第二步需要单独创建一个窗口)
### 4、npx hardhat ignition deploy ./ignition/modules/Lock.js --network localhost 部署合约
部署合约地址：LockModule#Lock - 0x5FbDB2315678afecb367f032d93F642f64180aa3
### 5、npx hardhat test test/Shipping.js 测试


# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.js
```
