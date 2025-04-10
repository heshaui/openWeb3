const { JsonRpcProvider, Contract, getBigInt, formatUnits } = require("ethers");
const url = 'https://eth-mainnet.g.alchemy.com/v2/whHK1LIqevgkmwX1Ko3MUMmwq2mCXmp_'
// 提供商
const provider = new JsonRpcProvider(url);

// USDT的合约地址
const contractAddress = '0xdac17f958d2ee523a2206206994597c13d831ec7'
// 构建USDT的Transfer的ABI
const abi = [
  "event Transfer(address indexed from, address indexed to, uint value)"
];
// 生成USDT合约对象
const contractUSDT = new Contract(contractAddress, abi, provider);

async function main() {
    try{
        contractUSDT.once('Transfer', (from, to, value) => {
            console.log(`一次监听：from:${from} --> to:${to} --> value: ${formatUnits(getBigInt(value), 6)}`)
        })
        contractUSDT.on('Transfer', (from, to, value) => {
            console.log(`持续坚挺监听：from:${from} --> to:${to} --> value: ${formatUnits(getBigInt(value), 6)}`)
        }) 
    } catch (err) {
        console.log(`错误：${err}`)
    }
}
main()