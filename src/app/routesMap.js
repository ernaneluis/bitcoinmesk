import { redirect } from 'redux-first-router'
import { toWallet } from './routerActions'

const routesMap = {
  WALLET: {
    path: '/',
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
