import {
  BUILD_TRANSACTION_SUCCESS,
  BUILD_TRANSACTION_FAILURE,
} from '../typesReducers'

export const initialState = {
  isTransactionConfirmed: false,
}

export default (state = initialState, { type, payload, error }) => {
  switch (type) {
    case BUILD_TRANSACTION_FAILURE:
      return { ...state, error }

    case BUILD_TRANSACTION_SUCCESS:
      console.log('BUILD_TRANSACTION_SUCCESS', payload)
      return {
        ...state,
        isTransactionConfirmed: true,
      }

    default:
      return state
  }
}
