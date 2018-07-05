import { HDPrivateKey } from 'bitcore-lib'

const createPrivateKeyFromHDPrivate = hdPrivateKey =>
  new Promise((resolve, reject) => {
    try {
      const derived = hdPrivateKey.derive("m/0'")
      const privateKey = derived.privateKey
      resolve(privateKey)
    } catch (error) {
      reject(error)
    }
  })

export default { createPrivateKeyFromHDPrivate }
