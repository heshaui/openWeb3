const { JsonRpcProvider, Contract, getBigInt, formatUnits } = require("ethers");
const url = 'https://eth-mainnet.g.alchemy.com/v2/whHK1LIqevgkmwX1Ko3MUMmwq2mCXmp_'
// 提供商
const provider = new JsonRpcProvider(url);

// 合约
const abiUSDT = [
    "event Transfer(address indexed from, address indexed to, uint value)",
    "function balanceOf(address) public view returns(uint)",
  ];
const addressUSDT = '0xdac17f958d2ee523a2206206994597c13d831ec7'
const contractUSDT = new Contract(addressUSDT, abiUSDT, provider)

const balanceAddress = '0x28C6c06298d514Db089934071355E5743bf21d60'

async function main() {
    const balance = await contractUSDT.balanceOf(balanceAddress)
    console.log(`当前余额：${formatUnits(getBigInt(balance), 6)}USDT`)

    // 创建过滤器监听转入
    const filterIn = contractUSDT.filters.Transfer(null, balanceAddress)
    console.log(`转入详情：${JSON.stringify(filterIn)}`)
    
    // 监听转入事件
    contractUSDT.on(filterIn, (from, to, value) => {
      console.log(`持续监听转入：from:${from} --> to:${to} --> value: ${formatUnits(getBigInt(value), 6)}`)
    })

    // 创建过滤器监听转出
    const filterOut = contractUSDT.filters.Transfer(balanceAddress)
    console.log(`转出详情：${JSON.stringify(filterOut)}`)
    contractUSDT.on(filterOut, (from, to, value) => {
      console.log(`持续监听转出：from:${from} --> to:${to} --> value: ${formatUnits(getBigInt(value), 6)}`)
    })
}
main()