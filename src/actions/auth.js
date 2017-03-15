import axios from 'axios'
import Cache from '../utils/cache'
import { user } from '../data/'

export const AUTH = 'AUTH'
export const AUTH_INIT = 'AUTH_INIT'
export const AUTH_ERROR = 'AUTH_ERROR'
export const AUTH_SUCCESS = 'AUTH_SUCCESS'

const AUTH_URL = 'https://api.insta360.com'

function authInit() {
  function getInitialState() {
    const cache = new Cache()
    return cache.get('auth') || {
      isLoggedIn: false,
      profile: {}
    }
  }

  return {
    type: AUTH_INIT,
    data: getInitialState()
  }
}

function authStart() {
  return {
    type: AUTH
  }
}

function authSuccess(data) {
  function setInitialState(state) {
    const cache = new Cache()
    cache.set('auth', JSON.stringify(state))
  }

  if (data.flag) {
    // auth success    
    const _data = Object.assign({
      isLoggedIn: true
    }, user)

    setInitialState(_data)

    return {
      type: AUTH_SUCCESS,
      data: _data
    }
  }

  return {
    type: AUTH_ERROR,
    data: {
      isLoggedIn: false
    }
  }
}

function authError() {
  return {
    type: AUTH_ERROR,
    data: {
      isLoggedIn: false
    }
  }
}

export function initAuth() {
  return (dispatch) => {
    dispatch(authInit())
  }
}

export function loginAuth(user) {

  if (process.env.NODE_ENV === 'production') {
    // pro
    return (dispatch) => {
      dispatch(authStart())
      return axios({
        url: AUTH_URL,
        timeout: 20000,
        method: 'post',
        data: user,
        responseType: 'json'
      }).then(function (response) {
        dispatch(authSuccess(response.data.data))
      }).catch(function (response) {
        dispatch(authError(response.data.data))
      })
    }

  } else {
    // dev
    console.log('#action:auth:loginAuth')
    if (user.email === 'thonatos@sina.com') {
      return (dispatch) => {
        return dispatch(authSuccess({
          flag: true,
          user: user
        }))
      }
    } else {
      return (dispatch) => {
        return dispatch(authError())
      }
    }
  }
}