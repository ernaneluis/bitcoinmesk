import {
  CREATE_KEY_FAILURE,
  CREATE_KEY_SUCCESS,
  RESTORE_WALLET,
  SAVE_WALLET,
  FETCH_MASTER_PRIVATE_KEY,
  INCREASE_NOUNCE_DERIVATION,
  FETCH_ALL_KEYS_SUCCESS,
  FETCH_MNEMONIC,
  FETCH_ADDRESS_BALANCE,
  FETCH_ADDRESS_TRANSACTIONS,
} from '../typesReducers'

// not safe keep on local storage uncrypted data such as masterPrivateKey
// only save encryptedMnemonic, passwordHint, nounce of Deriviation (from 0 to X) to be used on path derivation
// once user add his password(lock scene) it will:
// 1) dencrypted his mnemonic
// 2) derive masterPrivateKey from mnmonic + password
// 3) derive all private keys by for 0 to nounceDeriviation
// ps: when create a new address then increment nounceDeriviation

export const initialState = {
  vault: {
    encryptedMnemonic: '',
    nounceDeriviation: 0,
    passwordHint: '',
    keys: [],
    transactions: {},
  },
  masterPrivateKey: '',
  mnemonic: '',
  balances: {},
}

export default (state = initialState, { type, payload, error }) => {
  switch (type) {
    case CREATE_KEY_FAILURE:
      return { ...state, error }

    case CREATE_KEY_SUCCESS:
      console.log('CREATE_KEY_SUCCESS', payload)
      return {
        ...state,
        vault: {
          ...state.vault,
          // redux expect a new state object in order to call render
          keys: [...state.vault.keys, payload],
        },
      }

    case FETCH_ALL_KEYS_SUCCESS:
      console.log('FETCH_ALL_KEYS_SUCCESS', payload)
      return {
        ...state,
        vault: {
          ...state.vault,
          // redux expect a new state object in order to call render
          keys: [...state.vault.keys, payload],
        },
      }

    case RESTORE_WALLET:
      console.log('RESTORE_WALLET', payload)
      return {
        ...state,
        vault: payload,
      }

    case SAVE_WALLET:
      return {
        ...state,
        vault: { ...payload, nounceDeriviation: 0, keys: [] },
      }

    case FETCH_MASTER_PRIVATE_KEY:
      console.log('FETCH_MASTER_PRIVATE_KEY', payload)
      return {
        ...state,
        masterPrivateKey: payload,
      }

    case INCREASE_NOUNCE_DERIVATION:
      console.log('INCREASE_NOUNCE_DERIVATION')
      const nounceDeriviation = state.vault.nounceDeriviation + 1

      return {
        ...state,
        vault: { ...state.vault, nounceDeriviation },
      }

    case FETCH_MNEMONIC:
      console.log('FETCH_MNEMONIC', payload)
      return {
        ...state,
        mnemonic: payload,
      }

    case FETCH_ADDRESS_BALANCE: {
      console.log('FETCH_ADDRESS_BALANCE', payload)
      const { address, balance } = payload
      const balances = state.balances
      balances[address] = balance

      return {
        ...state,
        balances: { ...balances },
      }
    }

    case FETCH_ADDRESS_TRANSACTIONS: {
      console.log('FETCH_ADDRESS_TRANSACTIONS', payload)
      const { address, transactions } = payload
      const vaultTransactions = state.vault.transactions
      vaultTransactions[address] = transactions

      return {
        ...state,
        vault: {
          ...state.vault,
          transactions: { ...vaultTransactions },
        },
      }
    }

    default:
      return state
  }
}
