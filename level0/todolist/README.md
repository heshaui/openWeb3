# 将合约发不到sepolia测试网络
### 1、开发合约
### 2、编译合约
### 3、创建alchemy应用获取api_key
### 4、增加hardhat.config.js配置
### 5、部署合约npx hardhat ignition deploy ./ignition/modules/TodoList.js --network sepolia
### 6、查看https://sepolia.etherscan.io/address/地址，点击标识的 transaction hash 可以查看部署的 tx 的详情


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
