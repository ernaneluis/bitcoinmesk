import {
  BUILD_TRANSACTION_SUCCESS,
  BUILD_TRANSACTION_FAILURE,
  SEND_TRANSACTION_SUCCESS,
  SEND_TRANSACTION_FAILURE,
} from '../typesReducers'

import { loadState } from '../persistWallet'
import * as bitcoin from '../../app/lib/bitcoin'

import { toWallet } from './routerActions'

export const sendTransaction = ({
  privateKeys,
  toAddress,
  amount,
  utxos,
}) => dispatch => {
  return bitcoin.transaction
    .buildTransaction({ privateKeys, toAddress, amount, utxos })
    .then(transaction => {
      const rawTx = transaction.serialize()
      dispatch({
        type: BUILD_TRANSACTION_SUCCESS,
        payload: rawTx,
      })
      return bitcoin.transaction.sendTransaction({ rawTx })
    })
    .catch(error => {
      console.error({ error })
      dispatch({ type: BUILD_TRANSACTION_FAILURE, error: error.message })
    })
    .then(({ txid }) =>
      dispatch({
        type: SEND_TRANSACTION_SUCCESS,
        payload: txid,
      })
    )
    .catch(error => {
      console.error('SEND_TRANSACTION', { error })
      dispatch({ type: BUILD_TRANSACTION_FAILURE, error: error.message })
    })
}
