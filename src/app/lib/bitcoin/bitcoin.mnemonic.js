import * as Mnemonic from 'bitcore-mnemonic'

const createMnemonicFromSeed = seedHex =>
  new Promise((resolve, reject) => {
    try {
      const seed = new Buffer(seedHex, 'hex')
      const mnemonic = Mnemonic.fromSeed(seed, Mnemonic.Words.ENGLISH)
      resolve(mnemonic)
    } catch (error) {
      reject(error)
    }
  })

//import { HDPrivateKey } from 'bitcore-lib'
// var pk = mnemonic.toHDPrivateKey('my password', 'testnet') // or livenet
// console.log(pk)

// var mnemonic = new Mnemonic()
// var seed = mnemonic.toSeed('my passphrase')
export default { createMnemonicFromSeed }
