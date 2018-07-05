import {
  CREATE_PRIVATE_KEY_FAILURE,
  CREATE_PRIVATE_KEY_REQUEST,
  CREATE_PRIVATE_KEY_SUCCESS,
} from '../typesReducers'

import * as bitcoin from '../../app/lib/bitcoin'

export const createPrivateKeyFromMnemonic = mnemonic => dispatch => {
  dispatch({ type: CREATE_PRIVATE_KEY_REQUEST })
  return bitcoin.mnemonic
    .createHDPrivateFromMnemonic(mnemonic)
    .then(hdPrivate => bitcoin.private.createPrivateKeyFromHDPrivate(hdPrivate))
    .then(privateKey =>
      dispatch({ type: CREATE_PRIVATE_KEY_SUCCESS, payload: privateKey })
    )
    .catch(error => dispatch({ type: CREATE_PRIVATE_KEY_FAILURE, error }))
}
