import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import { hashHistory } from 'react-router'
import { routerMiddleware, push } from 'react-router-redux'
import { createStore, applyMiddleware, compose } from 'redux'

import rootReducer from '../reducers'

import * as authActions from '../actions/auth'
import * as shareActions from '../actions/share'
import * as orderActions from '../actions/order'
import * as productActions from '../actions/product'


const actionCreators = {
  authActions,
  shareActions,
  orderActions,
  productActions,
  push,
}

const logger = createLogger({
  level: 'info',
  collapsed: true
})

const router = routerMiddleware(hashHistory)

// If Redux DevTools Extension is installed use it, otherwise use Redux compose
/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    // Options: http://zalmoxisus.github.io/redux-devtools-extension/API/Arguments.html
    actionCreators,
  }) :
  compose;

/* eslint-enable no-underscore-dangle */
const enhancer = composeEnhancers(
  applyMiddleware(thunk, router, logger)
)

export default function configureStore(initialState: Object) {
  const store = createStore(rootReducer, initialState, enhancer)
  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers')) // eslint-disable-line global-require
    )
  }
  return store
}