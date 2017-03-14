import axios from 'axios'

export const LOGIN = 'LOGIN'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_ERROR = 'LOGIN_ERROR'

export const REGISTER = 'REGISTER'
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
export const REGISTER_ERROR = 'REGISTER_ERROR'

function login() {
  return {
    type: LOGIN
  }
}

function loginSuccess(json) {
  return {
    type: LOGIN_SUCCESS,
    data: json
  }
}

function loginError(json) {
  return {
    type: LOGIN_ERROR,
    data: json
  }
}

function register() {
  return {
    type: REGISTER
  }
}

function registerSuccess(json) {
  return {
    type: REGISTER_SUCCESS,
    data: json
  }
}

function registerError(json) {
  return {
    type: REGISTER_ERROR,
    data: json
  }
}

export function userLogin(url) {
  return (dispatch) => {
    dispatch(login())
    return axios({
      url: url,
      timeout: 20000,
      method: 'get',
      responseType: 'json'
    }).then(function (response) {
      dispatch(loginSuccess(response.data))
    }).catch(function (response) {
      dispatch(LOGIN_ERROR(response.data))
    })
  }
}

export function userRegister(url) {
  return (dispatch) => {
    dispatch(register())
    return axios({
      url: url,
      timeout: 20000,
      method: 'get',
      responseType: 'json'
    }).then(function (response) {
      dispatch(registerSuccess(response.data))
    }).catch(function (response) {
      dispatch(registerError(response.data))
    })
  }
}