const { JsonRpcProvider, Contract, getBigInt, formatUnits } = require("ethers");
const url = 'https://eth-mainnet.g.alchemy.com/v2/whHK1LIqevgkmwX1Ko3MUMmwq2mCXmp_'
// 提供商
const provider = new JsonRpcProvider(url);

// 合约 abi
const abiERC721 = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function supportsInterface(bytes4) public view returns(bool)",
];
// ERC721 的合约地址，这里用的 BAYC
const addressBAYC = "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d"
// 创建 ERC721 合约实例
const contractERC721 = new Contract(addressBAYC, abiERC721, provider)

const selectorERC721 = "0x80ac58cd"

async function main() {
    const nameERC721 = await contractERC721.name()
    console.log(`ERC721名称：${nameERC721}`)
    const symbolERC721 = await contractERC721.symbol()
    console.log(`ERC721代号：${symbolERC721}`)

    const isERC721 = await contractERC721.supportsInterface(selectorERC721)
    console.log(`合约是否为ERC721标准: ${isERC721}`)
}

main()