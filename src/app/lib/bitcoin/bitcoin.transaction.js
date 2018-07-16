import { Transaction, Networks } from 'bitcore-lib'
import { getProvider } from './bitcoin.provider'

export const buildTransaction = ({ privateKeys, toAddress, amount, utxos }) =>
  new Promise((resolve, reject) => {
    try {
      const changeAddress = 'mw6q3tV8usdP8KT3xXtR6BiueGVDyzLdnU' // create an change address based on the fromAddress
      const transaction = new Transaction()
        .from(utxos) // Feed information about what unspent outputs one can use
        .to(toAddress, parseInt(amount)) // Add an output with the given amount of satoshis
        .change(changeAddress) // Sets up a change address where the rest of the funds will go
        // fee(amount)
        .sign(privateKeys) // Signs all the inputs it can
      resolve(transaction)
    } catch (error) {
      reject(error)
    }
  })

export const sendTransaction = ({ rawTx, provider = 'insight' }) => {
  getProvider(provider).sendTransaction({ rawTx })
}

export const getTransaction = ({ txhash, provider = 'insight' }) =>
  getProvider(provider).getTransaction({ txhash })

export default {
  buildTransaction,
  sendTransaction,
  getTransaction,
}
