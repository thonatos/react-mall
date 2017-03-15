import axios from 'axios'
import Cache from '../utils/cache'

export const AUTH = 'AUTH'
export const AUTH_INIT = 'AUTH_INIT'
export const AUTH_ERROR = 'AUTH_ERROR'
export const AUTH_SUCCESS = 'AUTH_SUCCESS'

const AUTH_URL = 'https://api.insta360.com'

function init() {
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

function start() {
  return {
    type: AUTH
  }
}

function success(data) {
  function setInitialState(state) {
    const cache = new Cache()
    cache.set('auth', state)
  }

  if (data.flag) {
    // auth success
    setInitialState(data)

    return {
      type: AUTH_SUCCESS,
      data: data
    }
  }

  return {
    type: AUTH_ERROR,
    data: data
  }
}

function error(data) {
  return {
    type: AUTH_ERROR,
    data: data
  }
}

export function authInit() {
  return (dispatch) => {
    dispatch(init())
  }
}

export function auth(user) {
  return (dispatch) => {
    dispatch(start())
    return axios({
      url: AUTH_URL,
      timeout: 20000,
      method: 'post',
      data: user,
      responseType: 'json'
    }).then(function (response) {
      dispatch(success(response.data.data))
    }).catch(function (response) {
      dispatch(error(response.data.data))
    })
  }
}