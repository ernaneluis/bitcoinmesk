import * as bitcoin from 'bitcoinjs-lib'
import bip38 from 'bip38'
import wif from 'wif'

const createAddress = ({ passphrase }) =>
  new Promise((resolve, reject) => {
    try {
      const pvKey = Buffer.from('correct horse battery staple')
      const pvKeyWifEnconded = wif.encode(128, pvKey, true)
      const pvKeyWifDecoded = wif.decode(pvKeyWifEnconded)

      // encrypted key will be saved on local storage
      const encryptedKey = bip38.encrypt(
        pvKeyWifDecoded.privateKey,
        pvKeyWifDecoded.compressed,
        passphrase
      )
      resolve(encryptedKey)
    } catch (error) {
      reject(error)
    }
  })

const openAddress = async ({ encryptedKey, passphrase }) => {
  const decryptedKey = await bip38.decrypt(encryptedKey, passphrase)
  const testpvKeyWifEnconded = wif.encode(
    128,
    decryptedKey.privateKey,
    decryptedKey.compressed
  )
  console.log({ testpvKeyWifEnconded })
  return testpvKeyWifEnconded
}

export default { createAddress, openAddress }
