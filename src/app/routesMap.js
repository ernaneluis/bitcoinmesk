import { redirect } from 'redux-first-router'
import {
  toWallet,
  toWelcome,
  toNew,
  toLock,
} from '../store/actions/routerActions'
import { isEmpty } from 'lodash'
import { restoreWallet, fetchAllKeys } from '../store/actions/walletActions'

const routesMap = {
  WALLET: {
    path: '/',
    thunk: (dispatch, getState) => {
      // must call restore wallet on route because thunk is called first than persistWallet
      dispatch(restoreWallet())

      if (isEmpty(getState().wallet.vault.encryptedMnemonic))
        dispatch(redirect(toWelcome()))
      // else if (isEmpty(getState().wallet.masterPrivateKey))
      //   dispatch(redirect(toLock()))
      else {
        const keys = getState().wallet.keys
        const masterPrivateKey = getState().wallet.masterPrivateKey
        const nounceDeriviation = getState().wallet.vault.nounceDeriviation
        if (keys.length !== nounceDeriviation)
          dispatch(fetchAllKeys({ masterPrivateKey, nounceDeriviation }))
      }
    },
  },

  NEW: {
    path: '/new',
    thunk: (dispatch, getState) => {
      dispatch(restoreWallet())
      // TODO: more safe checks like this should be added in future
      if (!isEmpty(getState().wallet.vault.encryptedMnemonic))
        dispatch(redirect(toWallet()))
    },
  },

  WELCOME: {
    path: '/welcome',
    thunk: (dispatch, getState) => {
      dispatch(restoreWallet())
      if (!isEmpty(getState().wallet.vault.encryptedMnemonic))
        dispatch(redirect(toWallet()))
    },
  },

  LOCK: {
    path: '/lock',
  },

  RECEIVE: {
    path: '/receive',
  },

  SEND: {
    path: '/send',
  },

  RESTORE: {
    path: '/restore',
  },

  CATCH_ALL_REDIRECT: {
    path: '*',
    thunk: dispatch => dispatch(redirect(toWallet())),
  },
}

export default routesMap
