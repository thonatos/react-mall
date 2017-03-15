import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import auth from './auth'
import product from './product'

const rootReducer = combineReducers({    
  auth,
  product,
  routing
})

export default rootReducer