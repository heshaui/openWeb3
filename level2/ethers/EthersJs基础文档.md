## ethers.js 常用方法（基于 v6）

---

### 🏗️ 1. 连接到以太坊网络（Provider）

```js
const { JsonRpcProvider } = require("ethers");

const provider = new JsonRpcProvider("https://cloudflare-eth.com");
```

#### 🔹 常用 Provider 方法：

```js
await provider.getBlockNumber();            // 当前区块号
await provider.getNetwork();                // 网络信息
await provider.getBalance(address);         // 查询余额
await provider.getTransaction(txHash);      // 获取交易详情
await provider.resolveName("vitalik.eth");  // ENS 转地址
await provider.lookupAddress(address);      // 地址转 ENS（反解）
await provider.getCode(address);            // 获取地址上部署的合约代码
await provider.getGasPrice();               // 当前 gas 价格
await provider.getFeeData();                // 查询当前建议的gas设置
await provider.getTransactionCount("vitalik.eth"); // 查询 vitalik 钱包历史交易次数
```

---

### 🔐 2. 钱包（Wallet）

```js
const { Wallet } = require("ethers");

const wallet = Wallet.createRandom(); // 新钱包（随机助记词）
const wallet2 = new Wallet(privateKey); // 从私钥创建
const connectedWallet = wallet.connect(provider);
```

#### 🔹 常用 Wallet 方法：

```js
await connectedWallet.getBalance();           // 获取钱包余额
await connectedWallet.sendTransaction({       // 发交易
  to: "0x...",
  value: parseEther("0.01")
});

const signedTx = await connectedWallet.signTransaction(txData); // 手动签名交易
const signedMsg = await connectedWallet.signMessage("Hello");   // 签名消息
```

---

### 💰 3. 单位转换

```js
const { parseEther, formatEther, parseUnits, formatUnits } = require("ethers");

parseEther("1.0");       // -> BigInt(1000000000000000000)
formatEther(balance);    // -> "1.0"

parseUnits("1.5", 6);    // 1.5 USDC (6 decimals)
formatUnits(amount, 6);  // 格式化成 USDC 显示
```

---

### 📦 4. 合约交互（Contract）

```js
const { Contract } = require("ethers");

const abi = [ "function balanceOf(address) view returns (uint)" ];
const dai = new Contract(daiAddress, abi, provider);

const balance = await dai.balanceOf("0xYourAddress");
```

#### 🔹 连接钱包以发送交易：

```js
const daiWithSigner = dai.connect(wallet);
await daiWithSigner.transfer("0xRecipient", parseUnits("10.0", 18));
```

#### 🔹 调用合约函数的两种方式：

```js
// 只读函数（view/pure）
await contract.someReadMethod(...args);

// 需要 gas 的交易函数（state-changing）
await contractWithSigner.someWriteMethod(...args);
```

---

### 🧠 5. 常用工具函数

```js
import {
  getAddress,            // 校验并格式化地址
  isAddress,             // 校验地址格式
  id,                    // keccak256(utf8Bytes(input))
  keccak256,
  toUtf8Bytes,
  namehash,              // ENS 名称哈希
  zeroPadValue,
  solidityPacked,        // Solidity 类型打包
  Interface              // ABI 接口编码/解码
} from "ethers";
```

---

### 🎲 6. ENS

```js
await provider.resolveName("vitalik.eth");  // -> 地址
await provider.lookupAddress("0x...");      // -> ENS 名称（如果有）
```

---

### ⛓️ 7. 网络/链信息

```js
await provider.getNetwork(); // { chainId: 1, name: "homestead" }
```

---

### 🚀 8. 合约部署（Contract Deployment）

```js
const factory = new ethers.ContractFactory(abi, bytecode, wallet);
const contract = await factory.deploy(/* constructor args */);
await contract.waitForDeployment();
console.log("合约地址:", await contract.getAddress());
```

---

### 🛎️ 9. 事件监听（Events）

```js
contract.on("Transfer", (from, to, amount, event) => {
  console.log(`Transfer from ${from} to ${to}: ${amount.toString()}`);
  console.log(event); // 原始事件对象
});

contract.once("Transfer", (from, to, amount) => {
  console.log("一次性监听 Transfer:", from, to, amount);
});

// 取消监听
contract.off("Transfer", handler);
```

---

### 🔐 10. 多签钱包交互（以 Gnosis Safe 为例）

```js
const gnosisSafe = new Contract(safeAddress, safeAbi, wallet);
await gnosisSafe.submitTransaction(to, value, data, operation);
```

---

### 🧾 11. 日志和事件解析（Log Parsing）

```js
const iface = new ethers.Interface(abi);
const parsedLog = iface.parseLog(log);
console.log(parsedLog.name, parsedLog.args);
```

---

### 🧪 12. 签名 & 验证

```js
const message = "Hello Web3";
const signature = await wallet.signMessage(message);

const signer = ethers.verifyMessage(message, signature);
console.log("签名者:", signer);
```

---

### 🪙 13. 常用 Token 合约操作（如 ERC20）

```js
const erc20Abi = [
  "function balanceOf(address) view returns (uint)",
  "function allowance(address, address) view returns (uint)",
  "function approve(address spender, uint amount)",
  "function transferFrom(address from, address to, uint amount)"
];

const token = new Contract(tokenAddress, erc20Abi, wallet);
await token.approve(spender, amount);
await token.transferFrom(from, to, amount);
```

---

### 🧠 14. Hash 与加密

```js
keccak256(toUtf8Bytes("hello"));          // 字符串哈希
ethers.sha256("0x1234...");              // 原始字节哈希
```

---

### 🧪 15. 使用 Interface 进行低级编码/解码

```js
const iface = new ethers.Interface(["function transfer(address,uint256)"]);
const data = iface.encodeFunctionData("transfer", [to, amount]);
const decoded = iface.decodeFunctionData("transfer", data);
```

---

### 📘 附：如何查看完整 API 文档

- 官方文档（v6）：https://docs.ethers.org/v6/
- 示例教程：https://docs.ethers.org/v6/getting-started/
- ethers-cookbook：https://github.com/ethers-io/ethers.js/blob/main/docs/cookbook.md

