const {JsonRpcProvider, Wallet, Contract, formatEther, parseEther} = require('ethers')

// provider
const url = 'https://sepolia.infura.io/v3/68187abecabe41509aab9e7c6c932204'
const provider = new JsonRpcProvider(url);

//利用私钥和provider创建wallet对象
const privateKey = '0f03a73988c990c2333bbbcd99d442377fedbe48083a8a9c4426ace223c33e5d';
const wallet = new Wallet(privateKey, provider);

// contract
// WETH的ABI
const abiWETH = [
    "function balanceOf(address) public view returns(uint)",
    "function deposit() public payable",
    "function transfer(address, uint) public returns (bool)",
    "function withdraw(uint) public",
];
// WETH合约地址（sepolia测试网）
const addressWETH = '0x7b79995e5f793a07bc00c21412e50ecae098e7f9'
// WETH Contract

// 声明可写合约
const contractWETH = new Contract(addressWETH, abiWETH, wallet)

async function main() {
    // 钱包地址
    const walletAddress = await wallet.getAddress()
    console.log(`钱包地址：${walletAddress}`)
    // 钱包余额
    const walletBalance = await contractWETH.balanceOf(walletAddress)
    console.log(`钱包余额：${formatEther(walletBalance)}`)
    // encodeFunctionData(函数名称, 函数所需参数)：编码函数的 calldata
    const calldata = contractWETH.interface.encodeFunctionData('balanceOf', [walletAddress])
    console.log(`编码calldata:${calldata}`)

    // 创建交易
    const tx = {
        to: addressWETH,
        data: calldata
    }
    // 发起交易，可读操作（view/pure）可以用 provider.call(tx)
    const balanceWETH = await provider.call(tx)
    console.log(`存款前WETH持仓: ${formatEther(balanceWETH)}\n`)

    // deposit函数编码calldata
    const calldata1 = contractWETH.interface.encodeFunctionData('deposit')
    const tx1 = {
        to: addressWETH,
        data: calldata1,
        value: parseEther('0.001')
    }
    // 发起交易，写入操作需要 wallet.sendTransaction(tx)
    const receipt1 = await wallet.sendTransaction(tx1)
    // 等待交易上链
    await receipt1.wait()
    console.log('交易详情')
    console.log(receipt1)
    const balance_deposit = await contractWETH.balanceOf(walletAddress)
    console.log(`交易后余额：${formatEther(balance_deposit)}`)
}

main()