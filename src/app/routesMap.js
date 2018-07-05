import { redirect } from 'redux-first-router'
import { toWallet, toInit } from '../store/actions/routerActions'
import { isEmpty } from 'lodash'

const routesMap = {
  WALLET: {
    path: '/',
    thunk: (dispatch, getState) => {
      if (isEmpty(getState().wallet.vault)) dispatch(redirect(toInit()))
    },
  },

  INIT: {
    path: '/init',
  },

  CREATE: {
    path: '/create',
  },

  IMPORT: {
    path: '/import',
  },

  TRANSACTION: {
    path: '/tx',
  },

  CATCH_ALL_REDIRECT: {
    path: '*',
    thunk: dispatch => dispatch(redirect(toWallet())),
  },
}

export default routesMap
