const { JsonRpcProvider } = require('ethers')
const rpc_url = 'https://eth-mainnet.g.alchemy.com/v2/whHK1LIqevgkmwX1Ko3MUMmwq2mCXmp_'
const provider = new JsonRpcProvider(rpc_url)

const address = '0x8315177aB297bA92A06054cE80a67Ed4DBd7ed3a'
const slot = '0xb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d6103'

// const value = await provider.getStorage(contractAddress, slot)

async function main() {
    const data = await provider.getStorage(address, slot)
    console.log('获取的数据', data)
}
main()