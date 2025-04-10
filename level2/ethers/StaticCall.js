/*
const tx = await contract.函数名.staticCall( 参数, {override})
console.log(`交易会成功吗？：`, tx)
函数名：为模拟调用的函数名。

参数：调用函数的参数。

{override}：选填，可包含以下参数：

from：执行时的 msg.sender，也就是你可以模拟任何一个人的调用，比如 Vitalik。
value：执行时的 msg.value。
blockTag：执行时的区块高度。
gasPrice
gasLimit
nonce
*/
const {JsonRpcProvider, Wallet, Contract, formatEther, parseEther} = require('ethers')
// provider
const url = 'https://eth-mainnet.g.alchemy.com/v2/whHK1LIqevgkmwX1Ko3MUMmwq2mCXmp_'
const provider = new JsonRpcProvider(url)

// wallet
const privateKey = '0f03a73988c990c2333bbbcd99d442377fedbe48083a8a9c4426ace223c33e5d'
const wallet = new Wallet(privateKey, provider)

// contract
const abiDAI = [
    "function balanceOf(address) public view returns(uint)",
    "function transfer(address, uint) public returns (bool)",
];
const addressDAI = '0x6B175474E89094C44Da98b954EedeAC495271d0F'
const contractDAI = new Contract(addressDAI, abiDAI, provider)

async function main() {
    // 查询当前钱包余额
    const address = await wallet.getAddress()
    const balanceDAI = await contractDAI.balanceOf(address)
    console.log(`当前余额：${formatEther(balanceDAI)}`)

    // 用staticCall模拟transfer转账
    const tx = await contractDAI.transfer.staticCall("vitalik.eth", parseEther('1.0'), {from: await provider.resolveName("vitalik.eth")})
    console.log(`交易会成功吗？：`, tx)

    // 用staticCall模拟给钱包转账
    const tx1 = await contractDAI.transfer.staticCall("vitalik.eth", parseEther('10000'), {from: address})
    console.log(`交易会成功吗？：`, tx1)
}
main()