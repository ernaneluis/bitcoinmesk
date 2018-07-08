import { HDPrivateKey, PrivateKey, Networks, PublicKey } from 'bitcore-lib'

// ' means hardened or h, 0' === 0h
// derivationPath: "m/44'/0'/0'/0/0",
// derivation scheme: "m / 44' / coin_type' / account' / change / address_index"
const getDerivationPath = nounceDeriviation =>
  `m/44'/0'/0'/0/${nounceDeriviation}`

export const deriveKey = (masterPrivateKey, nounceDeriviation) =>
  new Promise((resolve, reject) => {
    try {
      let key = {
        privateKey: '',
        publicKey: '',
        address: '',
      }
      createPrivateKeyFromMasterPrivateKey(masterPrivateKey, nounceDeriviation)
        .then(privateKey => {
          key.privateKey = privateKey.toWIF()
          return getPublicKeyFromPrivateKey(privateKey)
        })
        .then(publicKey => {
          key.publicKey = publicKey.toString()
          return getAddressFromPublicKey(publicKey)
        })
        .then(address => {
          key.address = address.toString()
          resolve(key)
        })
        .catch(error => reject(error))
    } catch (error) {
      reject(error)
    }
  })

// https://bitcore.io/api/lib/hd-keys
const createPrivateKeyFromMasterPrivateKey = (
  masterPrivateKey,
  nounceDeriviation
) =>
  new Promise((resolve, reject) => {
    try {
      const hdPrivateKey = new HDPrivateKey(masterPrivateKey)
      const isValid = HDPrivateKey.isValidPath(
        getDerivationPath(nounceDeriviation),
        true
      )
      const derived = hdPrivateKey.derive(getDerivationPath(nounceDeriviation))
      const privateKey = derived.privateKey
      // obtain HDPublicKey
      // var hdPublicKey = hdPrivateKey.hdPublicKey;
      resolve(privateKey)
    } catch (error) {
      reject(error)
    }
  })

const getPublicKeyFromPrivateKey = privateKey =>
  new Promise((resolve, reject) => {
    try {
      // const privateKey = PrivateKey.fromWIF(privateKeyWif)
      const publicKey = privateKey.toPublicKey()
      resolve(publicKey)
    } catch (error) {
      reject(error)
    }
  })

const getAddressFromPublicKey = publicKey =>
  new Promise((resolve, reject) => {
    try {
      // const publicKeyObj = new PublicKey(publicKey)
      const network =
        process.env.REACT_APP_ENV === 'development'
          ? Networks.testnet
          : Networks.livenet
      const address = publicKey.toAddress(network)
      resolve(address)
    } catch (error) {
      reject(error)
    }
  })

export default {
  deriveKey,
  createPrivateKeyFromMasterPrivateKey,
  getPublicKeyFromPrivateKey,
  getAddressFromPublicKey,
}
/*

// extended public key, it’s possible to derive child public keys using the same method,
// without knowing the sensitive private key.

// The first three levels are hardened, meaning it’s not possible to derive the different accounts’ public keys 
// from the master public key. Using the accounts’ extended public keys though, it is possible to generate every 
// address under that account, making it possible to generate “read-only” addresses without risking 
// the accounts’ funds. If one account’s extended private key or one of its child private keys are exposed,
// that damage will be limited to that account but the other accounts are kept safe.

// Since there are endless possible variations of these paths, the BIP44 standard specifies a limited set to 
// use in HD wallets. If a user imports their private key to a wallet application that implements 
// BIP44 (such as Mycelium), it will automatically keep generating addresses for the first account (m/44'/0'/0'/x/x),
// as long as it finds transactions for them. If you add a second account, it will do the same.
more: 
// https://medium.com/@sevcsik/working-with-bitcoin-hd-wallets-ii-deriving-public-keys-c48341629388
// https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki
// https://bitcoin.org/en/developer-guide#loose-key-wallets
// https://bitcoin.stackexchange.com/questions/62533/key-derivation-in-hd-wallets-using-the-extended-private-key-vs-hardened-derivati
*/
