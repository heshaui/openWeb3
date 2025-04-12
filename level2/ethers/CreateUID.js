const { Wallet } = require('ethers')
const regex = /^0x00.*$/
while(true) {
    const wallet = Wallet.createRandom()
    if (regex.test(wallet.address)) {
        console.log(`靓号地址：${wallet.address}`)
        console.log(`靓号私钥：${wallet.privateKey}`)
        console.log(`靓号助记词：${JSON.stringify(wallet.mnemonic)}`)
        break;
    }
}