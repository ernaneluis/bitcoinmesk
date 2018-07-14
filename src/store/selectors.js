import { get, last, sumBy } from 'lodash'
import * as bitcoin from '../app/lib/bitcoin'

export const getLastAddress = state =>
  last(get(state, 'wallet.vault.keys', [])).address

export const simplifyTransactions = (address, transactions) =>
  transactions.map(transaction => {
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

export const getBalance = simpleTransactions => {
  const totalReceive = sumBy(
    simpleTransactions.filter(transaction => transaction.type === 'RECEIVE'),
    'value'
  )

  const totalSend = sumBy(
    simpleTransactions.filter(transaction => transaction.type === 'SEND'),
    'value'
  )
  return totalReceive - totalSend
}
