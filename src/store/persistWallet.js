import { RESTORE_WALLET } from './typesReducers'
import { initialState } from './reducers/walletReducer'

export const loadState = () => {
  try {
    const stringState = localStorage.getItem('bitmaskWallet')
    return stringState === null ? initialState : JSON.parse(stringState)
  } catch (error) {
    console.error(error)
    return initialState
  }
}

export const saveState = state => {
  try {
    localStorage.setItem('bitmaskWallet', JSON.stringify(state))
  } catch (error) {
    console.error(error)
  }
}

let currentValue

export const persistWallet = store => {
  store.dispatch({ type: RESTORE_WALLET, payload: loadState() })

  store.subscribe(() => {
    let previousValue = currentValue
    currentValue = store.getState().wallet.vault
    if (previousValue !== currentValue) saveState(currentValue)
  })
}
