const { 
    HDNodeWallet,
    Wallet, 
    formatEther, 
    parseEther, 
    Mnemonic, 
    randomBytes,
    Contract,
    JsonRpcProvider  
} = require('ethers')

// 生成助记词
const mnemonic = Mnemonic.entropyToPhrase(randomBytes(32))
// 路径
const basePath = "44/60'/0'/0"
// 根据助记词生成基钱包
const baseWallet = HDNodeWallet.fromPhrase(mnemonic, basePath)

// 钱包数量
const walletNum = 20
// 钱包地址集合
const walletAddressList = []
for (let i=0; i < walletNum; i++) {
    const newWallet = baseWallet.derivePath(i.toString())
    walletAddressList.push(newWallet.address)
    console.log(`第{i+1}个钱包地址：${newWallet.address}`)
}
// 创建多个发送金额
const amounts = Array(walletNum).fill(parseEther('0.0001'))
console.log('发送金额：', amounts)

// provider
const url = 'https://sepolia.infura.io/v3/68187abecabe41509aab9e7c6c932204'
const provider = new JsonRpcProvider(url);

// wallet
// 方法2 利用私钥和provider创建wallet对象
const privateKey = '0f03a73988c990c2333bbbcd99d442377fedbe48083a8a9c4426ace223c33e5d';
const wallet = new Wallet(privateKey, provider);

// Airdrop contract
const abiAirdrop = [
    "function multiTransferToken(address,address[],uint256[]) external",
    "function multiTransferETH(address[],uint256[]) public payable",
];
// Airdrop合约地址（sepolia测试网）
const addressAirdrop = '0x271cf0ef2d4da48f751912244f794bbcc9878a1b' // Airdrop Contract
const contractAirdrop = new Contract(addressAirdrop, abiAirdrop, wallet)

// ETH contract
const abiWETH = [
    "function balanceOf(address) public view returns(uint)",
    "function transfer(address, uint) public returns (bool)",
    "function approve(address, uint256) public returns (bool)"
];
// WETH合约地址（sepolia测试网）
const addressWETH = '0x7b79995e5f793a07bc00c21412e50ecae098e7f9' // WETH Contract
const contractWETH = new Contract(addressWETH, abiWETH, wallet)

async function main() {
    // 查询第1个钱包地址的原生代币ETH的余额
    const currentAddress = walletAddressList[0]
    const balanceETH = await provider.getBalance(currentAddress)
    console.log(`第一个地址的ETH余额：${formatEther(balanceETH)}`)
    // 查询 WETH合约的余额
    const balanceWETH = await contractWETH.balanceOf(currentAddress)
    console.log(`第一个地址的WETH余额：${formatEther(balanceWETH)}`)

    // 调用multiTransferETH 给每个钱包转0.0001ETH ，{value: parseEther('0.002')}这个必须大于20个地址的钱包总和
    const txETH = await contractAirdrop.multiTransferETH(walletAddressList, amounts, {value: parseEther('0.002')})
    console.log('等待交易上链')
    await txETH.wait()
    // console.log('交易详情', txETH)
    const balanceETH1 = await provider.getBalance(currentAddress)
    console.log(`交易后第一个地址的ETH余额：${formatEther(balanceETH1)}`)

    // 调用multiTransferToken 给每个钱包转0.0001WETH
    // 先用contractWETH的approve函数批准constractAirdrop合于
    const txApprove = await contractWETH.approve(addressAirdrop, parseEther('1'))
    await txApprove.wait()
    console.log('批准成功，可以执行交易')

    const txWETH = await contractAirdrop.multiTransferToken(addressWETH, walletAddressList, amounts)
    await txWETH.wait()
    console.log('WETH 交易成功')
    // 查询 WETH合约的余额
    const balanceWETH1 = await contractWETH.balanceOf(currentAddress)
    console.log(`交易后第一个地址的WETH余额：${formatEther(balanceWETH1)}`)
}
main()

