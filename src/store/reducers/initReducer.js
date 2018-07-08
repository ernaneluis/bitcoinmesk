import {
  ADD_SEED_POINT,
  CREATE_MNEMONIC_SUCCESS,
  CREATE_SEED_REQUEST,
  CREATE_SEED_SUCCESS,
} from '../typesReducers'

const initialState = {
  points: [],
  isSeedingDone: false,
  seed: '',
  mnemonic: '',
}

export default (state = initialState, { type, payload, error }) => {
  switch (type) {
    case ADD_SEED_POINT:
      return {
        ...state,
        points: [...state.points, payload],
      }

    case CREATE_SEED_REQUEST:
      return {
        ...state,
        seed: payload,
      }

    case CREATE_SEED_SUCCESS:
      return {
        ...state,
        seed: payload,
        isSeedingDone: true,
      }

    case CREATE_MNEMONIC_SUCCESS:
      return {
        ...state,
        mnemonic: payload,
      }

    default:
      return state
  }
}
