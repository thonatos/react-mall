import Cache from '../utils/cache'

import {
  AUTH_ACTION,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  COMMON_REDIRECT

} from '../actions/auth'

const cache = new Cache()

const initialState = {
  authAction: 'none', // none/register/retrieve/login/done    
  isLoggedIn: false,
  expiration: 0,
  token: '',
  email: '',
  redirectUrl: ''
}

const getInitialState = function () {
  let raw = cache.get('auth') || false
  let auth = { ...initialState }

  if (raw) {
    auth = JSON.parse(raw)
    auth.isLoggedIn = (Math.ceil(Date.now() / 1000) < auth.expiration)
  }

  return auth
}

export default function reducer(state = getInitialState(), action = {}) {
  const { data } = action

  switch (action.type) {

    case AUTH_ACTION:
      return {
        ...state,
        authAction: data
      }

    case LOGIN_SUCCESS:
      const loginState = {
        ...state,
        ...data,
        authAction: 'done'
      }
      cache.set('auth', JSON.stringify(loginState))
      return {
        ...state,
        ...loginState
      }

    case REGISTER_SUCCESS:
      const registerState = {
        ...state,
        ...data,
        authAction: 'done'
      }
      cache.set('auth', JSON.stringify(registerState))
      return {
        ...state,
        ...registerState
      }

    case LOGOUT_SUCCESS:
      cache.remove('auth')
      return { ...initialState }

    case COMMON_REDIRECT:
      return {
        ...state,
        redirectUrl: data
      }

    default:
      return state
  }
}
