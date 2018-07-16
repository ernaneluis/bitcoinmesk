import { get, findLastKey, sumBy, isEmpty, forEach, flatten } from 'lodash'
import * as bitcoin from '../app/lib/bitcoin'

export const getAllAddresses = state => Object.keys(state.wallet.vault.keys)

export const getLastAddress = state =>
  !isEmpty(state.wallet.vault.keys)
    ? state.wallet.vault.keys[findLastKey(state.wallet.vault.keys)].address
    : ''

export const getBalance = state => {
  const utxos = getAllUtxos(state)
  return !isEmpty(utxos) ? sumBy(utxos, 'satoshis') : 0
}

export const simplifyTransactions = state =>
  !isEmpty(getAllTransactions(state))
    ? getAllTransactions(state).map(transaction => {
        const address = ''
        const { txid, confirmations, time, vin, vout } = transaction
        const type = !!vin.filter(input => input.addr === address).length
          ? 'SEND'
          : 'RECEIVE'

        let value = 0
        if (type === 'SEND') {
        } else {
          const selectedOuts = vout.filter(output =>
            output.scriptPubKey.addresses.includes(address)
          )
          value = bitcoin.utils.bitcoinToSatoshi(sumBy(selectedOuts, 'value'))
        }
        return { txid, confirmations, time, type, value }
      })
    : []

export const getAllTransactions = state =>
  flatten(
    getAllAddresses(state).map(address =>
      getTransactionsFromAddress({ state, address })
    )
  )

export const getTransactionsFromAddress = ({ state, address }) =>
  state.wallet.vault.keys[address].transactions

export const getAllUtxos = state =>
  flatten(
    getAllAddresses(state).map(address => {
      const transactions = getTransactionsFromAddress({ state, address })
      const utxos = getUtxosFromTransactions({ address, transactions })
      return utxos
    })
  )

export const getUtxosFromTransactions = ({ address, transactions }) =>
  transactions.map(transaction => {
    const { vout, txid } = transaction
    const output = vout.filter(output =>
      output.scriptPubKey.addresses.includes(address)
    )[0]

    return {
      satoshis: bitcoin.utils.bitcoinToSatoshi(output.value),
      address,
      txid,
      outputIndex: output.n,
      scriptPubKey: output.scriptPubKey.hex,
    }
  })

export const getPrivateKeyFromAddresses = ({ state, addresses }) =>
  addresses.map(address => state.wallet.vault.keys[address]['privateKey'])
