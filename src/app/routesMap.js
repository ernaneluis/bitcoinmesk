import { redirect } from 'redux-first-router'
import { isEmpty } from 'lodash'

import {
  toWallet,
  toWelcome,
  toNew,
  toLock,
} from '../store/actions/routerActions'

import {
  createKey,
  restoreWallet,
  fetchAllKeys,
} from '../store/actions/walletActions'

const routesMap = {
  WALLET: {
    path: '/',
    thunk: async (dispatch, getState) => {
      // must call restore wallet on route because thunk is called first than persistWallet
      await dispatch(restoreWallet())

      if (isEmpty(getState().wallet.vault.encryptedMnemonic))
        dispatch(redirect(toWelcome()))
      else if (isEmpty(getState().wallet.masterPrivateKey))
        dispatch(redirect(toLock()))
      // else {
      //   const keys = getState().wallet.keys
      //   const masterPrivateKey = getState().wallet.masterPrivateKey
      //   const nounceDeriviation = getState().wallet.vault.nounceDeriviation
      //   if (keys.length !== nounceDeriviation)
      //     dispatch(fetchAllKeys({ masterPrivateKey, nounceDeriviation }))
      // }
    },
  },

  NEW: {
    path: '/new',
    thunk: async (dispatch, getState) => {
      await dispatch(restoreWallet())
      // TODO: more safe checks like this should be added in future
      if (!isEmpty(getState().wallet.vault.encryptedMnemonic))
        dispatch(redirect(toWallet()))
    },
  },

  WELCOME: {
    path: '/welcome',
    thunk: async (dispatch, getState) => {
      await dispatch(restoreWallet())
      if (!isEmpty(getState().wallet.vault.encryptedMnemonic))
        dispatch(redirect(toWallet()))
    },
  },

  LOCK: {
    path: '/lock',
  },

  RECEIVE: {
    path: '/receive',
    thunk: async (dispatch, getState) => {
      await dispatch(restoreWallet())
      // if it is just after new
      if (!!getState().wallet.vault.nounceDeriviation.length) {
        await dispatch(
          createKey({
            masterPrivateKey: getState().wallet.masterPrivateKey,
            nounceDeriviation: 0,
          })
        )
      }
    },
  },

  SEND: {
    path: '/send',
  },

  RESTORE: {
    path: '/restore',
  },

  BACKUP: {
    path: '/backup',
    thunk: (dispatch, getState) => {
      if (isEmpty(getState().wallet.mnemonic)) dispatch(redirect(toLock()))
    },
  },

  CATCH_ALL_REDIRECT: {
    path: '*',
    thunk: dispatch => dispatch(redirect(toWallet())),
  },
}

export default routesMap
