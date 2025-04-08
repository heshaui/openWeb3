// ethers ^6.0.0版本使用方法
const { JsonRpcProvider, formatEther } = require("ethers");
const url = 'https://eth-mainnet.g.alchemy.com/v2/whHK1LIqevgkmwX1Ko3MUMmwq3mCXmp_'
const provider = new JsonRpcProvider(url);
const main = async () => {
    const balance = await provider.getBalance(`vitalik.eth`);
    console.log(`ETH Balance of vitalik: ${formatEther(balance)} ETH`);
}
main()