# Infura与Alchemy

### 1、Infura 是什么？

**Infura** 是由 ConsenSys（以太坊生态内的一个大公司）提供的一项基础设施服务，提供一组 API，使开发者可以轻松访问：

- 以太坊网络（主网和测试网）
- IPFS 网络（去中心化文件存储）
- 以及其他一些链，如 Arbitrum、Optimism、Polygon 等

**Infura 就是连接区块链的一扇窗，它能读写链上数据、广播交易，但必须自己掌握钥匙（私钥）。**

### 2、使用方法

```jsx
import { ethers } from 'ethers';

const infuraProjectId = '你的 Infura 项目ID';
const provider = new ethers.providers.InfuraProvider('mainnet', infuraProjectId);

async function getBalance(address) {
    const balance = await provider.getBalance(address);
    console.log(ethers.utils.formatEther(balance));
}
```

## 3、Alchemy与Infura类似，也是读写链上数据，广播交易

使用方法

```jsx
const { ethers } = require("ethers");
// 填上你的Alchemy API Key
const ALCHEMY_ID = ''
const provider = new ethers.providers.JsonRpcProvider(`https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_ID}`)
```

## 4、区别

### Alchemy 的优势（相较于 Infura）

1. **更丰富的开发工具和 API**
    - Alchemy 提供了像 `Alchemy Notify`（交易通知）、`Alchemy Mempool Visualizer`（内存池可视化）等工具，适合开发者调试和观察链上活动。
    - 提供一些高级的 API，例如 `alchemy_getAssetTransfers` 可以方便地查询地址的历史交易记录（Infura 没有这个）。
2. **更强的稳定性和速率（主观评价）**
    - 一些开发者社区反馈，Alchemy 在高流量环境下的响应速度和稳定性更好。
3. **开发体验更现代一些**
    - 文档更清晰，控制台体验更友好，适合初学者。

### Infura 的优势

1. **ConsenSys 出品，生态整合好**
    - Infura 是 MetaMask 背后的公司出品，和 MetaMask 等生态工具配合得更紧密。
2. **IPFS 支持更完善**
    - 如果你同时有去中心化存储的需求（比如 NFT 存图片），Infura 的 IPFS 网关和 API 更成熟。
3. **老牌服务，很多大项目在用**
    - 比如 Uniswap、MakerDAO 等早期就依赖 Infura。