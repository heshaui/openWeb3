const { WebSocketProvider, Interface, formatEther } = require('ethers')

// websocket provider
const rpc_url = 'wss://eth-sepolia.g.alchemy.com/v2/whHK1LIqevgkmwX1Ko3MUMmwq2mCXmp_'
const provider = new WebSocketProvider(rpc_url)

// interface
const iface = new Interface([
    "function transfer(address, uint) public returns (bool)",
])

// 函数选择器
const selector = iface.getFunction('transfer').selector

function throttle(fn, delay) {
    let timer = null;
    return (...args) => {
        if (!timer) {
            fn(...args)
            timer = setTimeout(() => {
                clearTimeout(timer)
                timer = null
            }, delay)
        }
    }
}

// 处理bigInt
function handleBigInt(key, value) {
    if (typeof value === "bigint") {
        return value.toString() + "n"; // or simply return value.toString();
    }
    return value;
}

async function main() {
    // 3. 监听pending交易，获取txHash
    let i = 0;
    let j = 0;
    // provider.on('pending', throttle(async(txHash) => {
    //     if (txHash && i < 5) {
    //         // 打印txHash
    //         console.log(`[${(new Date).toLocaleTimeString()}] 监听Pending交易 ${i}: ${txHash} \r`);
    //         i++
    //     }
    // }, 500))

    provider.on('pending', throttle(async(txHash) => {
        const tx = await provider.getTransaction(txHash)
        console.log(`\n[${(new Date).toLocaleTimeString()}] 监听Pending交易 ${j}: ${txHash} \r`);
        console.log(tx.data.indexOf(selector) !== -1)
        if (tx && tx.data.indexOf(selector) !== -1) {
            console.log(`打印解码交易详情:${JSON.stringify(iface.parseTransaction(tx), handleBigInt, 2)}`)
            console.log(`转账目标地址:${iface.parseTransaction(tx).args[0]}`)
            console.log(`转账金额:${formatEther(iface.parseTransaction(tx).args[1])}`)
            provider.removeListener('pending', this)
        }
        j++
    }, 500))
}

main()