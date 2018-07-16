import 'whatwg-fetch'
//https://bws.bitpay.com/bws/api
// https://github.com/bitpay/insight-api
const URL_API =
  process.env.REACT_APP_ENV === 'development'
    ? 'https://test-insight.bitpay.com/api'
    : 'https://insight.bitpay.com/api'

export const getTransaction = ({ txhash }) => fetch(`${URL_API}/tx/${txhash}`)

export const getAllTransactions = async ({ address }) =>
  await fetch(`${URL_API}/txs/?address=${address}`).then(
    async res => (await res.json()).txs
  )

export const getAddress = ({ address }) => fetch(`${URL_API}/addr/${address}`)

export const getBalance = async ({ address }) =>
  await fetch(`${URL_API}/addr/${address}/balance`).then(
    async res => await res.json()
  )

// /insight-api/addr/[:addr]/totalReceived
// /insight-api/addr/[:addr]/totalSent
// /insight-api/addr/[:addr]/unconfirmedBalance

export const getUtxo = ({ address }) => fetch(`${URL_API}/addr/${address}/utxo`)
/*
response
[
{
"address":"mo9ncXisMeAoXwqcV5EWuyncbmCcQN4rVs",
"txid":"d5f8a96faccf79d4c087fa217627bb1120e83f8ea1a7d84b1de4277ead9bbac1",
"vout":0,
"scriptPubKey":"76a91453c0307d6851aa0ce7825ba883c6bd9ad242b48688ac",
"amount":0.000006,
"satoshis":600,
"confirmations":0,
"ts":1461349425
},
{
"address": "mo9ncXisMeAoXwqcV5EWuyncbmCcQN4rVs",
"txid": "bc9df3b92120feaee4edc80963d8ed59d6a78ea0defef3ec3cb374f2015bfc6e",
"vout": 1,
"scriptPubKey": "76a91453c0307d6851aa0ce7825ba883c6bd9ad242b48688ac",
"amount": 0.12345678,
"satoshis: 12345678,
"confirmations": 1,
"height": 300001
}
]
*/

// Transaction Broadcasting POST response: { txid: [:txid] }
export const sendTransaction = async ({ rawTx }) =>
  await fetch(`${URL_API}/tx/send`, {
    method: 'POST',
    body: JSON.stringify(rawTx),
  }).then(async res => await res.json())
