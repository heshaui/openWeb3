const {HDNodeWallet, Mnemonic, randomBytes, Wallet} = require('ethers')

// 获取助记词
const mnemonic = Mnemonic.entropyToPhrase(randomBytes(32))
// 创建HD基钱包
// 基路径："m / purpose' / coin_type' / account' / change"
const basePath = "44'/ 60'/ 0'/0"
const baseWallet = HDNodeWallet.fromPhrase(mnemonic, basePath)
console.log(baseWallet)

// 通过HD钱包生出批量钱包
const numWallet = 20
// 派生路径：基路径 + "/ address_index"
// 我们只需要提供最后一位address_index的字符串格式，就可以从baseWallet派生出新钱包。V6中不需要重复提供基路径！
const wallets = []
for(let i = 0; i < numWallet; i++) {
    let baseNewWallet = baseWallet.derivePath(i.toString())
    wallets.push(baseNewWallet)
    console.log(`第${i + 1}个钱包地址：${baseNewWallet.address}`)
}

async function main() {
    // 保存钱包加密json
    const wallet = Wallet.fromPhrase(mnemonic)
    // 加密json需要的密码
    const pwd = 'RCC'
    const json = await wallet.encrypt(pwd)
    console.log(`加密json：${json}`)

    // 从加密json获取钱包
    const wallet1 = Wallet.fromEncryptedJson(json, pwd)
    console.log(`wallet1: ${wallet1}`)
}
main()


