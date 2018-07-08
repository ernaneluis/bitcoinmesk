import {
  CREATE_KEY_FAILURE,
  CREATE_KEY_SUCCESS,
  FETCH_ALL_KEYS_FAILURE,
  FETCH_ALL_KEYS_SUCCESS,
  FETCH_MASTER_PRIVATE_KEY,
  INCREASE_NOUNCE_DERIVATION,
  RESTORE_WALLET,
} from '../typesReducers'

import { loadState } from '../persistWallet'
import * as bitcoin from '../../app/lib/bitcoin'

import { toWallet } from './routerActions'

export const createKey = ({
  masterPrivateKey,
  nounceDeriviation,
}) => dispatch => {
  let key = {
    privateKey: '',
    publicKey: '',
    address: '',
  }

  return bitcoin.key
    .deriveKey(masterPrivateKey, nounceDeriviation)
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
    dispatch({
      type: CREATE_KEY_FAILURE,
    })
  }
}

export const unlockWallet = ({ encryptedMnemonic, password }) => dispatch => {
  bitcoin.utils
    .dencrypt({ message: encryptedMnemonic, password })
    .then(mnemonic =>
      bitcoin.mnemonic.getMasterKeyFromMnemonic({
        mnemonic,
        password,
      })
    )
    .then(masterPrivateKey => {
      dispatch({
        type: FETCH_MASTER_PRIVATE_KEY,
        payload: masterPrivateKey.toString(),
      })
      dispatch(toWallet())
    })
}
