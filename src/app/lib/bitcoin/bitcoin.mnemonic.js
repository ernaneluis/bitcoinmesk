import * as Mnemonic from 'bitcore-mnemonic'

const createMnemonicFromSeed = seedHex =>
  new Promise((resolve, reject) => {
    try {
      let seed = new Buffer(seedHex, 'hex')
      seed = seed.slice(0, 32)
      // suppose to reproduce 24 words mnemonic
      const mnemonic = Mnemonic.fromSeed(seed, Mnemonic.Words.ENGLISH)
      resolve(mnemonic)
    } catch (error) {
      reject(error)
    }
  })

const createHDPrivateFromMnemonic = mnemonic =>
  new Promise((resolve, reject) => {
    try {
      const mnemonicObj = new Mnemonic(mnemonic)
      let hdPrivate = mnemonicObj.toHDPrivateKey('testnet') // or livenet
      resolve(hdPrivate)
    } catch (error) {
      reject(error)
    }
  })

// var mnemonic = new Mnemonic()
// var seed = mnemonic.toSeed('my passphrase')
export default { createMnemonicFromSeed, createHDPrivateFromMnemonic }
