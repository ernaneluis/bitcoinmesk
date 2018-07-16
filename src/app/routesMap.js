import { redirect } from 'redux-first-router'
import { isEmpty } from 'lodash'

import {
  toWallet,
  toWelcome,
  toNew,
  toLock,
} from '../store/actions/routerActions'

import {
  restoreWallet,
  fetchAllKeys,
  fetchAllTransactions,
} from '../store/actions/walletActions'

import { getLastAddress, getAllAddresses } from '../store/selectors'

const routesMap = {
  WALLET: {
    path: '/',
    thunk: async (dispatch, getState) => {
      // must call restore wallet on route because thunk is called first than persistWallet
      await dispatch(restoreWallet())

      if (isEmpty(getState().wallet.vault.encryptedMnemonic))
        await dispatch(redirect(toWelcome()))
      else if (isEmpty(getState().wallet.masterPrivateKey))
        await dispatch(redirect(toLock()))
      else {
        await dispatch(fetchAllTransactions(getAllAddresses(getState())))
        //   const keys = getState().wallet.keys
        //   const masterPrivateKey = getState().wallet.masterPrivateKey
        //   const nounceDeriviation = getState().wallet.vault.nounceDeriviation
        //   if (keys.length !== nounceDeriviation)
        //     dispatch(fetchAllKeys({ masterPrivateKey, nounceDeriviation }))
      }
    },
  },

  NEW: {
    path: '/new',
    thunk: async (dispatch, getState) => {
      await dispatch(restoreWallet())
      // TODO: more safe checks like this should be added in future
      if (!isEmpty(getState().wallet.vault.encryptedMnemonic))
        await dispatch(redirect(toWallet()))
    },
  },

  WELCOME: {
    path: '/welcome',
    thunk: async (dispatch, getState) => {
      await dispatch(restoreWallet())
      if (!isEmpty(getState().wallet.vault.encryptedMnemonic))
        await dispatch(redirect(toWallet()))
    },
  },

  LOCK: {
    path: '/lock',
  },

  RECEIVE: {
    path: '/receive',
    thunk: async (dispatch, getState) => {
      await dispatch(restoreWallet())
    },
  },

  SEND: {
    path: '/send',
    thunk: async (dispatch, getState) => {
      await dispatch(restoreWallet())
    },
  },

  RESTORE: {
    path: '/restore',
  },

  BACKUP: {
    path: '/backup',
    thunk: async (dispatch, getState) => {
      if (isEmpty(getState().wallet.mnemonic))
        await dispatch(redirect(toLock()))
    },
  },

  CATCH_ALL_REDIRECT: {
    path: '*',
    thunk: async dispatch => await dispatch(redirect(toWallet())),
  },
}

export default routesMap
