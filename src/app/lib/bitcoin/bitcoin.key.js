import { HDPrivateKey, PrivateKey, Networks, PublicKey } from 'bitcore-lib'

// ' means hardened or h, 0' === 0h
// derivationPath: "m/44'/0'/0'/0/0",
// derivation scheme: "m / 44' / coin_type' / account' / change / address_index"

const getDerivationPath = (nounceDeriviation, isChange = false) => {
  const coinType =
    process.env.REACT_APP_ENV === 'development'
      ? '1' // Bitcoin Testnet
      : '0' // Bitcoin Livenet

  // +isChange convert false to 0 and true to 1
  const path = `m/44'/${coinType}'/0'/${+isChange}/${nounceDeriviation}`
  console.log(path)
  return path
}

// Constant 0 is used for external chain and constant 1 for internal chain (also known as change addresses).
// External chain is used for addresses that are meant to be visible outside of the wallet
// (e.g. for receiving payments). Internal chain is used for addresses which are not meant to be visible
// outside of the wallet and is used for return transaction change. Public derivation is used at this level.
const getChangeDerivationPath = nounceDeriviation =>
  getDerivationPath(nounceDeriviation, true)

export const deriveKey = (masterPrivateKey, nounceDeriviation) =>
  new Promise((resolve, reject) => {
    try {
      let key = {
        privateKey: '',
        publicKey: '',
        address: '',
      }
      derivePrivateKeyFromMasterPrivateKey(masterPrivateKey, nounceDeriviation)
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
const derivePrivateKeyFromMasterPrivateKey = (
  masterPrivateKey,
  nounceDeriviation
) =>
  new Promise((resolve, reject) => {
    try {
      const hdPrivateKey = new HDPrivateKey(masterPrivateKey)
      if (
        HDPrivateKey.isValidPath(getDerivationPath(nounceDeriviation), true)
      ) {
        const derived = hdPrivateKey.derive(
          getDerivationPath(nounceDeriviation)
        )
        const privateKey = derived.privateKey
        resolve(privateKey)
        // obtain HDPublicKey
        // var hdPublicKey = hdPrivateKey.hdPublicKey;
      } else reject(new Error('Invalid derivation path'))
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
  derivePrivateKeyFromMasterPrivateKey,
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
// bip 32 aka Hd Wallet https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki
// bip 44 aka standard hd wallet https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki
// TODO: bip 38 aka Passphrase-protected private key https://github.com/bitcoin/bips/blob/master/bip-0038.mediawiki 
// example bip 38 https://github.com/bitcoinjs/bip38
*/

/* TODO to import wallet it needs: Account discovery function
https://github.com/bitpay/copay/commit/29920abdb3771940d0f5d4eb5f551a3f19d93507

When the master seed is imported from an external source the software should start to discover the accounts in 
the following manner:

1 derive the first account's node (index = 0)
2 derive the external chain node of this account
3 scan addresses of the external chain; respect the gap limit described below
4 if no transactions are found on the external chain, stop discovery
5 if there are some transactions, increase the account index and go to step 1

This algorithm is successful because software should disallow creation of new accounts if previous one has no
transaction history, as described in chapter "Account" above.
Please note that the algorithm works with the transaction history, not account balances, so you can have an
account with 0 total coins and the algorithm will still continue with discovery.

Address gap limit
Address gap limit is currently set to 20. If the software hits 20 unused addresses in a row, it expects there
are no used addresses beyond this point and stops searching the address chain. We scan just the external chains,
because internal chains receive only coins that come from the associated external chains.

Wallet software should warn when the user is trying to exceed the gap limit on an external chain by generating a
new address.
*/
