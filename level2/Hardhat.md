# Hardhat

## 1、Hardhat 是什么？

**Hardhat 是一个 Ethereum 开发环境**，它让你可以：

- 编写、编译、部署智能合约
- 在本地运行以太坊节点（Hardhat Network）
- 调试 Solidity 合约（包括 console.log 支持）
- 运行测试（支持 Mocha/Chai）
- 编写脚本任务，例如部署脚本
- 与 Ethers.js、Waffle、TypeScript 等集成无缝

## 2、使用方法

### 安装 Hardhat

```bash
npm install hardhat --save-dev
```

### 创建新项目

```bash
npx hardhat
```

### 项目目录结构

- /artifacts - 编译后的合约 ABI
- /contracts - Solidity 智能合约源码
- /scripts - 部署脚本
- /test - 测试代码
- /hardhat.config.js - 配置文件

### 常用命令

<aside>

- **编译合约:** `npx hardhat compile`
- **启动本地网络:** `npx hardhat node`
- **部署合约:** `npx hardhat ignition deploy scripts/deploy.js --network localhost`
- **运行测试:** `npx hardhat test/test.js`
</aside>

## 3、前端调用

合约部署后会输出一个地址，合约编译后从artifacts目录获取ABI文件

```jsx
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import MyContractABI from "./MyContract.json"; // ABI 文件

const CONTRACT_ADDRESS = "0x..."; // 部署时输出的地址

export default function App() {
  const [contract, setContract] = useState(null);
  const [value, setValue] = useState(null);

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        
        const myContract = new ethers.Contract(
          CONTRACT_ADDRESS, 
          MyContractABI.abi, 
          signer
        );
        setContract(myContract);
      }
    };
    
    init();
  }, []);

  const getValue = async () => {
    if (contract) {
      const val = await contract.getValue();
      setValue(val.toString());
    }
  };

  return (
    <div>
      <h1>MyContract Frontend</h1>
      <button onClick={getValue}>Get Value</button>
      {value && <p>Value from contract: {value}</p>}
    </div>
);
}
```