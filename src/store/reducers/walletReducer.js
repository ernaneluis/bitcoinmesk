import {
  FETCH_ADDRESS_FAILURE,
  FETCH_ADDRESS_SUCCESS,
  CREATE_SEED_SUCCESS,
  CREATE_MNEMONIC_SUCCESS,
} from '../typesReducers'

const initialState = {
  seed: '',
  mnemonic: '',
}

export default (state = initialState, { type, payload, error }) => {
  switch (type) {
    case FETCH_ADDRESS_FAILURE:
      return { ...state, error }

    case FETCH_ADDRESS_SUCCESS:
      return { ...state, error: null }

    case CREATE_SEED_SUCCESS:
      console.log('CREATE_SEED_SUCCESS', payload)
      return {
        ...state,
        seed: payload,
      }

    case CREATE_MNEMONIC_SUCCESS:
      console.log('CREATE_MNEMONIC_SUCCESS', payload)
      return {
        ...state,
        mnemonic: payload,
      }

    default:
      return state
  }
}
