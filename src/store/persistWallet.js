import { RESTORE_WALLET } from './typesReducers'

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('bitmaskWallet')
    return serializedState === null ? undefined : JSON.parse(serializedState)
  } catch (error) {
    return undefined
  }
}

const saveState = state => {
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
