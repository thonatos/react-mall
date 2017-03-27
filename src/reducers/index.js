import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import auth from './auth'
import order from './order'
import product from './product'

const rootReducer = combineReducers({    
  auth,
  order,
  product,
  routing
})

export default rootReducer