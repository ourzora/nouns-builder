const { generateMnemonic, english, mnemonicToAccount } = require('viem/accounts')

const mnemonic = generateMnemonic(english)
const account = mnemonicToAccount(mnemonic)

console.log('||| PRIVATE KEY GENERATED |||')
console.log('mnemonic =>', mnemonic)
console.log('publicKey =>', account.address)
console.log('fullAccount =>', account)
