const {getBigInt, formatUnits, formatEther, parseUnits, parseEther} = require('ethers')

console.log(getBigInt('10000000'))
console.log(getBigInt('0x123456'))
//console.log(getBigInt(100000000))

// 小单位转大单位 formatUnits
const gwei = 1000000000
console.log('gwei 0', formatUnits(gwei, 0))
console.log('gwei gwei', formatUnits(gwei, 'gwei'))
const ether = formatUnits(gwei, 'ether')
console.log('ether', ether)
console.log('gwei empty', formatUnits(gwei))
console.log(formatEther(gwei))

// 大单位转小单位 parseUnits
console.log('ether to wei', parseUnits('1.0', 'ether'))
console.log(parseEther("1.0").toString());