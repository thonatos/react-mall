import {
  LOGIN_SUCCESS,
  LOGIN_ERROR
} from '../actions/auth'

const initialState = {
    isLoggedIn: false,
    expiration: 0,
    token: ''
}

export default function reducer(state = initialState, action = {}) {
  const { data } = action
  switch (action.type) {
    case LOGIN_SUCCESS:          
      return {...state, ...data}
    case LOGIN_ERROR:
      return {...data}
    default:
      return state
  }
}
