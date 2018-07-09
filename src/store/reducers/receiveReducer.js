import {
  CREATE_ADDRESS_FAILURE,
  CREATE_ADDRESS_SUCCESS,
} from '../../../../typesReducers'

const initialState = {
  addresses: [],
}

export default (state = initialState, { type, payload, error }) => {
  switch (type) {
    case CREATE_ADDRESS_FAILURE:
      return { ...state, error }

    case CREATE_ADDRESS_SUCCESS:
      return {
        ...state,
        error: null,
        addresses: state.addresses.push(payload.address),
      }

    default:
      return state
  }
}
