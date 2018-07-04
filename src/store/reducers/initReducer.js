import { CREATE_SEED_REQUEST, ADD_SEED_POINT } from '../typesReducers'

const initialState = {
  tempSeed: '',
  points: [],
}

export default (state = initialState, { type, payload, error }) => {
  switch (type) {
    case CREATE_SEED_REQUEST:
      console.log('CREATE_SEED_REQUEST', payload)
      return {
        ...state,
        tempSeed: payload,
      }

    case ADD_SEED_POINT:
      state.points.push(payload)
      return {
        ...state,
        points: state.points,
      }

    default:
      return state
  }
}
