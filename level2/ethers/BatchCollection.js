const {JsonRpcProvider, Wallet, Contract, Mnemonic, randomBytes, HDNodeWallet, formatEther, parseEther} = require('ethers')

// 1、provider
const rpc_url = 'https://sepolia.infura.io/v3/68187abecabe41509aab9e7c6c932204'
const provider = new JsonRpcProvider(rpc_url)

// 2、接受用的wallet
const privateKey = '94b39188d38b0caba2ec134595b65748e35ccdad96718597b81837045cb03a64'
const walletIn = new Wallet(privateKey, provider)

// 转出用的钱包
const privateKey1 = '0f03a73988c990c2333bbbcd99d442377fedbe48083a8a9c4426ace223c33e5d';
const walletOut = new Wallet(privateKey1, provider);

// 3、WETH contract
const abiWETH = [
    "function balanceOf(address) public view returns(uint)",
    "function transfer(address, uint) public returns (bool)",
    "function approve(address, uint256) public returns (bool)"
];
// WETH合约地址（sepolia测试网）
const addressWETH = '0x7b79995e5f793a07bc00c21412e50ecae098e7f9' // WETH Contract
const contractWETH = new Contract(addressWETH, abiWETH, walletIn)

// Airdrop contract
const abiAirdrop = [
    "function multiTransferToken(address,address[],uint256[]) external",
    "function multiTransferETH(address[],uint256[]) public payable",
];
// Airdrop合约地址（sepolia测试网）
const addressAirdrop = '0x271cf0ef2d4da48f751912244f794bbcc9878a1b' // Airdrop Contract
const contractAirdrop = new Contract(addressAirdrop, abiAirdrop, walletOut)

// 4、通过助记词创建HD钱包
const mnemonic = Mnemonic.entropyToPhrase(randomBytes(32))
const hdPath = "44/60'/0'/0"
const hdNode = HDNodeWallet.fromPhrase(mnemonic, hdPath)

//5、循环生成20个钱包
const walletNum = 20
const walletAddressList = []
const wallets = []
console.log('开始从HD钱包派生钱包')
for (let i=0; i<walletNum; i++) {
    const newHdNode = hdNode.derivePath(i.toString())
    const newWallet = new Wallet(newHdNode.privateKey)
    wallets.push(newWallet)
    walletAddressList.push(newWallet.address)
    console.log(newWallet.address)
}

// 定义发送金额
const amount = parseEther('0.0001')
console.log('发送金额：', amount)
// 创建多个发送金额
const amounts = Array(walletNum).fill(parseEther('0.0001'))

async function main() {
    const outWalletBalance = await provider.getBalance(walletOut.address)
    console.log(`outWalletBalance余额：${formatEther(outWalletBalance)}`)
    const inWalletBalance = await provider.getBalance(walletIn.address)
    console.log(`inWalletBalance余额：${formatEther(inWalletBalance)}`)
    const currentAddress = walletAddressList[0]
    // 6、读取第一个地址的ETH于WETH余额
    const balanceETH = await provider.getBalance(currentAddress)
    const balanceWETH = await contractWETH.balanceOf(currentAddress)
    console.log(`ETH余额：${formatEther(balanceETH)} \nWETH余额：${formatEther(balanceWETH)}`)

    // 调用multiTransferETH 给每个钱包转0.0001ETH ，{value: parseEther('0.002')}这个必须大于20个地址的钱包总和
    const txETH = await contractAirdrop.multiTransferETH(walletAddressList, amounts, {value: parseEther('0.002')})
    console.log('等待交易上链')
    await txETH.wait()
    const balanceETH1 = await provider.getBalance(currentAddress)
    console.log(`交易后第一个地址的ETH余额：${formatEther(balanceETH1)}`)

    // 给WETH转账
    // const txApprove = await contractWETH.approve(addressAirdrop, parseEther('1'))
    // await txApprove.wait()
    // console.log('批准成功，可以执行交易')
    // const txWETH = await contractAirdrop.multiTransferToken(addressWETH, walletAddressList, amounts)
    // await txWETH.wait()
    // // 查询 WETH合约的余额
    // const balanceWETH1 = await contractWETH.balanceOf(currentAddress)
    // console.log(`交易后第一个地址的WETH余额：${formatEther(balanceWETH1)}`)


    // 7、利用钱包类的 sendTransaction() 发送交易，归集每个钱包中的 ETH。
    console.log('归集钱包')
    const txSendETH = {
        to: walletIn.address,
        value: amount
    }
    let tx;
    for (let i = 0; i < walletNum; i++) {
        let walletiWithProvider = wallets[i].connect(provider)
        tx = await walletiWithProvider.sendTransaction(txSendETH)
        console.log(`第 ${i+1} 个钱包 ${walletiWithProvider.address} ETH 归集开始`)
    }
    await tx.wait()
    console.log(`ETH 归集结束`)

    // 8、归集WETH
    let tx1;
    for (let i = 0; i < walletNum; i++) {
        let walletiWithProvider = wallets[i].connect(provider)
        let contractConnect = contractWETH.connect(walletiWithProvider)
        tx1 = await contractConnect.transfer(walletIn.address, amount)
        console.log(`第 ${i+1} 个钱包 ${walletiWithProvider.address} WETH 归集开始`)
    }
    await tx1.wait()
    console.log('WETH归集结束')

    // 查询归集之后的余额
    const outWalletBalance1 = await provider.getBalance(walletOut.address)
    console.log(`outWalletBalance1余额：${formatEther(outWalletBalance1)}`)
    const inWalletBalance1 = await provider.getBalance(walletIn.address)
    console.log(`inWalletBalance1余额：${formatEther(inWalletBalance1)}`)

    const balanceETH2 = await provider.getBalance(currentAddress)
    const balanceWETH2 = await contractWETH.balanceOf(currentAddress)
    console.log(`ETH余额：${formatEther(balanceETH2)} \nWETH余额：${formatEther(balanceWETH2)}`)

}

main()