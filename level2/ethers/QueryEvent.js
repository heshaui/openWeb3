const { JsonRpcProvider, Contract, formatUnits, getBigInt } = require('ethers')

// provider
const url = 'https://sepolia.infura.io/v3/68187abecabe41509aab9e7c6c932204'
const provider = new JsonRpcProvider(url)

// contract
const abiETH = [
    "event Transfer(address indexed from, address indexed to, uint amount)"
];
const addressETH = '0x7b79995e5f793a07bc00c21412e50ecae098e7f9'
const contractETH = new Contract(addressETH, abiETH, provider)

async function main() {
	const blockNumber = await provider.getBlockNumber()
	console.log(`当前区块号：${blockNumber}`)
	// 检索合约const transferEvents = await contract.queryFilter('事件名', 起始区块, 结束区块)
	const transferEvents = await contractETH.queryFilter('Transfer', blockNumber - 10, blockNumber )
	console.log(`'检索合约：${JSON.stringify(transferEvents[0])}`)
	const onceEvent = transferEvents[0]
	// 解析事件
	const amount = formatUnits(getBigInt(onceEvent.args.amount), 'ether')
	const from = onceEvent.args.from
	const to = onceEvent.args.to
	console.log(`from:${from}->amount:${amount}->to:${to}`)
}

main()