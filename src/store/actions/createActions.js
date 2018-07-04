import {
  CREATE_ADDRESS_FAILURE,
  CREATE_ADDRESS_REQUEST,
  CREATE_ADDRESS_SUCCESS,
} from '../typesReducers'

import * as bitcoin from '../../app/lib/bitcoin'

export const createAddress = createForm => dispatch => {
  dispatch({ type: CREATE_ADDRESS_REQUEST })
  return bitcoin.address
    .createAddress(createForm)
    .then(payload => dispatch({ type: CREATE_ADDRESS_SUCCESS, payload }))
    .catch(error => dispatch({ type: CREATE_ADDRESS_FAILURE, error }))
}
