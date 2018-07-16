import {
  CREATE_KEY_FAILURE,
  CREATE_KEY_SUCCESS,
  FETCH_ALL_KEYS_FAILURE,
  FETCH_ALL_KEYS_SUCCESS,
  FETCH_MASTER_PRIVATE_KEY,
  INCREASE_NOUNCE_DERIVATION,
  RESTORE_WALLET,
  FETCH_MNEMONIC,
  FETCH_ADDRESS_BALANCE,
  FETCH_ADDRESS_TRANSACTIONS,
} from '../typesReducers'

import { loadState } from '../persistWallet'
import * as bitcoin from '../../app/lib/bitcoin'

import { toWallet } from './routerActions'

export const createKey = ({
  masterPrivateKey,
  nounceDeriviation,
}) => dispatch => {
  const path = bitcoin.key.getDerivationPath(nounceDeriviation)

  return bitcoin.key
    .deriveKey(masterPrivateKey, path)
    .then(key => {
      dispatch({
        type: CREATE_KEY_SUCCESS,
        payload: key,
      })
      dispatch({
        type: INCREASE_NOUNCE_DERIVATION,
      })
    })
    .catch(error => {
      console.error({ error })
      dispatch({ type: CREATE_KEY_FAILURE, error: error.message })
    })
}

export const restoreWallet = () => dispatch => {
  dispatch({ type: RESTORE_WALLET, payload: loadState() })
}

export const fetchAllKeys = ({
  masterPrivateKey,
  nounceDeriviation,
}) => async dispatch => {
  try {
    let keys = [...Array(nounceDeriviation).keys()]
    keys = await Promise.all(
      keys.map((key, index) =>
        bitcoin.key.deriveKey(masterPrivateKey, index).then(key => key)
      )
    )
    dispatch({
      type: FETCH_ALL_KEYS_SUCCESS,
      payload: keys,
    })
  } catch (error) {
    console.error({ error })
    dispatch({
      type: CREATE_KEY_FAILURE,
    })
  }
}

export const unlockWallet = ({ encryptedMnemonic, password }) => dispatch => {
  bitcoin.utils
    .dencrypt({ message: encryptedMnemonic, password })
    .then(mnemonic => {
      dispatch({
        type: FETCH_MNEMONIC,
        payload: mnemonic.toString(),
      })
      return bitcoin.mnemonic.getMasterKey({ mnemonic })
    })
    .then(masterPrivateKey => {
      dispatch({
        type: FETCH_MASTER_PRIVATE_KEY,
        payload: masterPrivateKey.toString(),
      })
    })
}

export const fetchAddressBalance = ({ address }) => dispatch => {
  bitcoin.address.getBalance({ address }).then(balance =>
    dispatch({
      type: FETCH_ADDRESS_BALANCE,
      payload: { address, balance },
    })
  )
}

export const fetchAllTransactions = addresses => dispatch =>
  addresses.forEach(address => {
    bitcoin.address.getAllTransactions({ address }).then(transactions =>
      dispatch({
        type: FETCH_ADDRESS_TRANSACTIONS,
        payload: { address, transactions },
      })
    )
  })
