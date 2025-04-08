# Ganache-本地测试工具

## 1、什么是 Ganache？

**Ganache** 是一个为以太坊区块链开发设计的本地测试工具，来自 [Truffle Suite](https://trufflesuite.com/)。它允许开发者：

- 本地运行一个以太坊区块链模拟环境（无须连接真实网络）
- 快速测试智能合约部署、调用、交易等功能
- 提供预设的测试账户和 Ether 余额
- 可以回退、前进、快进区块 —— 模拟区块链行为

## 2、安装方式

### 安装 CLI：

```bash
npm install -g ganache
```

### 安装 GUI（桌面应用）：

访问：https://trufflesuite.com/ganache

## 3、常用命令

```bash
# 基本启动
ganache

# 帮助
ganache --help

# 自定义端口和账户数量
ganache --port 8546 --accounts 20 --defaultBalanceEther 1000

# 使用固定助记词
ganache --mnemonic "candy maple cake sugar pudding cream honey rich smooth crumble sweet treat"

# 将状态持久化到 ./data 目录
ganache --db ./data
```

4、使用方法

```jsx
<script src="https://cdn.jsdelivr.net/npm/web3@1.10.0/dist/web3.min.js"></script>
<script>
// 连接 Ganache 本地节点
const web3 = new Web3("http://localhost:8545");

async function main() {
    const accounts = await web3.eth.getAccounts();
    console.log("Ganache Accounts:", accounts);
    
    const balance = await web3.eth.getBalance(accounts[0]);
    console.log("Balance (ETH):", web3.utils.fromWei(balance, 'ether'));
}

main();
</script>
```