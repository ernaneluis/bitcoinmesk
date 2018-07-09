import {
  MAKE_TRANSACTION_SUCCESS,
  MAKE_TRANSACTION_FAILURE,
} from '../typesReducers'

export const initialState = {
  isTransactionConfirmed: false,
}

export default (state = initialState, { type, payload, error }) => {
  switch (type) {
    case MAKE_TRANSACTION_FAILURE:
      return { ...state, error }

    case MAKE_TRANSACTION_SUCCESS:
      console.log('MAKE_TRANSACTION_SUCCESS', payload)
      return {
        ...state,
        isTransactionConfirmed: true,
      }

    default:
      return state
  }
}
