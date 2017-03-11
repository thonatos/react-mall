import thunk from 'redux-thunk'
import { hashHistory } from 'react-router'
import { routerMiddleware } from 'react-router-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers'

const router = routerMiddleware(hashHistory)
const enhancer = applyMiddleware(thunk, router)

export default function configureStore(initialState: Object) {
  return createStore(rootReducer, initialState, enhancer)
}