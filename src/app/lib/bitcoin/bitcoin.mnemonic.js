import * as Mnemonic from 'bitcore-mnemonic'
import utils from './bitcoin.utils'
// entropy > seed > mnemonic + password > hdkey
const createMnemonicFromSeed = seedHex =>
  new Promise((resolve, reject) => {
    try {
      // convert seex hex to bytes array
      const seedHexBytes = seedHex.match(/.{1,2}/g).map(b => parseInt(b, 16))
      let selectedBytes = new Uint8Array(16)
      // populate selectedBytes with random selected elements from seedHexBytes
      selectedBytes = selectedBytes.map(e =>
        utils.getRandomInt(0, seedHexBytes.length)
      )
      // reduce the hex to bytes array  to 16bytes lenght
      const seed = Buffer.from(selectedBytes)
      // 128 bits = 16 bytes will generate 12 words mnemonic
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
