import {
  compose as _compose,
  applyMiddleware,
  combineReducers,
  createStore,
} from 'redux'
import { connectRoutes } from 'redux-first-router'
import { persistStore, persistReducer } from 'redux-persist'
import { reducer as formReducer } from 'redux-form'
import storage from 'redux-persist/lib/storage'
import thunkMiddleware from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'

import routesMap from './app/routesMap'
import walletReducer from './app/scenes/wallet/store/walletReducer'

export const history = createHistory()

const {
  reducer: locationReducer,
  middleware: routerMiddleware,
  enhancer: routerEnhancer,
  initialDispatch: locationInitialDispatch,
} = connectRoutes(history, routesMap, { initialDispatch: false })

const rootReducer = combineReducers({
  form: formReducer,
  location: locationReducer,
  wallet: walletReducer,
})

const persistConfig = {
  blacklist: ['location', 'form'],
  key: 'bitmask',
  storage,
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

const enhancers = [routerEnhancer]
const middlewares = [thunkMiddleware, routerMiddleware]

const compose =
  process.env.NODE_ENV === 'development'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || _compose
    : _compose

const composedEnhancers = compose(
  ...enhancers,
  applyMiddleware(...middlewares)
)

const store = createStore(persistedReducer, composedEnhancers)

export const persistor = persistStore(store, {}, locationInitialDispatch)
export default store
