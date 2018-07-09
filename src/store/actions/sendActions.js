import {
  MAKE_TRANSACTION_SUCCESS,
  MAKE_TRANSACTION_FAILURE,
} from '../typesReducers'

import { loadState } from '../persistWallet'
import * as bitcoin from '../../app/lib/bitcoin'

import { toWallet } from './routerActions'

export const makeTransaction = ({
  fromAddress,
  toAddress,
  amount,
}) => dispatch => {
  return bitcoin.key
    .deriveKey(masterPrivateKey, nounceDeriviation)
    .then(key => {
      dispatch({
        type: MAKE_TRANSACTION_SUCCESS,
        payload: key,
      })
    })
    .catch(error => {
      console.error({ error })
      dispatch({ type: MAKE_TRANSACTION_FAILURE, error: error.message })
    })
}
