import { Transaction, Networks } from 'bitcore-lib'
import { getProvider } from './bitcoin.provider'

export const makeTransaction = ({ fromAddress, toAddress, amount }) =>
  new Promise((resolve, reject) => {
    try {
      const utxos = {}
      /* get from fromAddress by insight api request 
        { 
        prevTxId:	    string
        outputIndex:    number
        script:	        Buffer | string | Script
        satoshis:       number
        }
      */
      const changeAddress = '' // create an change address based on the fromAddress
      const privateKey = '' // Array | String | PrivateKey
      const transaction = new Transaction()
        .from(utxos) // Feed information about what unspent outputs one can use
        .to(toAddress, amount) // Add an output with the given amount of satoshis
        .change(changeAddress) // Sets up a change address where the rest of the funds will go
        // fee(amount)
        .sign(privateKey) // Signs all the inputs it can
      //  const rawTx = transaction.serialize()
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

export const getAllTransactions = ({ address, provider = 'insight' }) =>
  getProvider(provider).getAllTransactions({ address })

export default { makeTransaction }
