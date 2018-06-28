import {
  RETRIEVE_KEYS_FAILURE,
  RETRIEVE_KEYS_SUCCESS,
} from '../../../../typesReducers'

const initialState = {
  keys: [],
}

export default (state = initialState, { type, payload, error }) => {
  switch (type) {
    case RETRIEVE_KEYS_FAILURE:
      return { ...state, error }

    case RETRIEVE_KEYS_SUCCESS:
      return { ...state, error: null, keys: payload.keys }

    default:
      return state
  }
}
