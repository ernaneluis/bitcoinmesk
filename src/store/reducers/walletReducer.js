import {
  CREATE_PRIVATE_KEY_FAILURE,
  CREATE_PRIVATE_KEY_SUCCESS,
  CREATE_SEED_SUCCESS,
  CREATE_MNEMONIC_SUCCESS,
} from '../typesReducers'

const initialState = {
  seed: '',
  mnemonic: '',
  privateKeys: [],
}

export default (state = initialState, { type, payload, error }) => {
  switch (type) {
    case CREATE_PRIVATE_KEY_FAILURE:
      return { ...state, error }

    case CREATE_PRIVATE_KEY_SUCCESS:
      console.log('CREATE_PRIVATE_KEY_SUCCESS', payload)
      state.privateKeys.push(payload)
      return { ...state, privateKeys: state.privateKeys }

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
