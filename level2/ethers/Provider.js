const { JsonRpcProvider, formatEther } = require("ethers");
const url = 'https://eth-mainnet.g.alchemy.com/v2/whHK1LIqevgkmwX1Ko3MUMmwq2mCXmp_'
const provider = new JsonRpcProvider(url);
const address = 'vitalik.eth'

const main = async() => {
    // 当前区块号
    const blockNumber = await provider.getBlockNumber();  
    console.log(`当前区块号:${blockNumber}`)

    // 网络信息
    const network = await provider.getNetwork();
    console.log(`网络信息:${JSON.stringify(network)}`)

    // 查询余额
    const balance = await provider.getBalance(address);
    // formatEther 单位转换
    console.log(`查询余额：${formatEther(balance)}`)

    // 获取交易详情 txHash交易后的哈希值
    //const transaction = await provider.getTransaction(txHash); 
    //console.log(`获取交易详情:${transaction}`)

    // 查询bytecode
    const code = await provider.getCode('0xeEbaED7F2Ec5CE16446601118fb30B8698db824b')
    console.log(`bytecode:${code}`)
}
main()