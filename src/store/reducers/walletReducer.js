import {
  CREATE_PRIVATE_KEY_FAILURE,
  CREATE_PRIVATE_KEY_SUCCESS,
  RESTORE_WALLET,
  SAVE_WALLET,
} from '../typesReducers'

const initialState = {
  vault: {
    // HDPathderiver
    encryptedMnemonic: '',
    passwordHint: '',
  },
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

    case RESTORE_WALLET:
      console.log('RESTORE_WALLET', payload)

      return {
        ...state,
        vault: payload,
      }

    case SAVE_WALLET:
      return {
        ...state,
        vault: payload,
      }

    default:
      return state
  }
}
