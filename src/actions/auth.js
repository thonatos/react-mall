import md5 from 'crypto-js/md5'
import Cache from '../utils/cache'
import { API_SERVER_USER } from '../config/'
import request from '../utils/request'

import { notification } from 'antd'
const cache = new Cache()

function getExpiretion() {
  return Math.ceil(Date.now() / 1000) + 60 * 30 // 30Min
}

function notify(title, message, type, callback) {
  const args = {
    message: title,
    description: message,
    onClose: () => {
      if (callback) {
        callback()
      }
    }
  }
  return type ? notification[type](args) : notification.open(args)
}

// INIT
export const AUTH_RESTORE = 'AUTH_RESTORE'
export function restoreAuth() {
  const auth_raw = cache.get('auth') || false
  return (dispatch) => {
    if (auth_raw) {
      const auth = JSON.parse(auth_raw)
      dispatch({
        type: AUTH_RESTORE,
        data: auth
      })
    }
  }
}

// CAPTCHA
const API_CAPTCHA_SEND = API_SERVER_USER + '/captcha/send'
export function sendCaptcha(data) {
  return (dispatch) => {
    return request({
      url: API_CAPTCHA_SEND,
      method: 'post',
      data: data,
      responseType: 'json'
    }, (response) => {
      if (response.code === 0) {
        notify('Captcha', 'Success, Please check your email', 'success')
      } else {
        notify('Captcha', 'Error:' + response.errorMsg, 'error')
      }
    }, (err) => {
      console.log('#server', err)
      notify('Captcha', 'Network Error, Please try again', 'error')
    })
  }
}

// SIGNIN
const API_ACCOUNT_SIGNIN = API_SERVER_USER + '/account/signin'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export function login(user) {
  user['username'] = user.email
  user['password'] = md5(user.password).toString()
  return (dispatch) => {
    return request({
      url: API_ACCOUNT_SIGNIN,
      method: 'post',
      data: user,
      responseType: 'json'
    }, (response) => {
      if (response.code === 0) {
        let state = Object.assign({
          email: user.email,
          isLoggedIn: true,
          expiration: getExpiretion()
        }, response.data)
        cache.set('auth', JSON.stringify(state))
        dispatch({
          type: LOGIN_SUCCESS,
          data: state
        })
      } else {
        notify('Login', 'Error:' + response.errorMsg, 'error')
      }
    }, (err) => {
      console.log('#server', err)
      notify('Login', 'Network Error, Please try again', 'error')
    })
  }
}

// SIGNUP
const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const API_ACCOUNT_SIGNUP = API_SERVER_USER + '/account/signup'
export function register(user) {
  user['source'] = 'shop'
  user['password'] = md5(user.password).toString()
  delete user['confirm']

  return (dispatch) => {
    return request({
      url: API_ACCOUNT_SIGNUP,
      method: 'post',
      data: user,
      responseType: 'json'
    }, (response) => {
      if (response.code === 0) {
        notify('Register', 'Success, Please login with the email & password', 'success')
        dispatch({
          type: REGISTER_SUCCESS,
          data: { register: true }
        })
      } else {
        notify('Register', 'Error:' + response.errorMsg, 'error')
      }
    }, (err) => {
      console.log('#server', err)
      notify('Register', 'Network Error, Please try again', 'error')
    })
  }
}

// RETIREVE
const RETIREVE_SUCCESS = 'RETIREVE_SUCCESS'
const API_ACCOUNT_RESET_PASSWORD = API_SERVER_USER + '/account/resetPassword'
export function retrieve(user) {
  user['password'] = md5(user.password).toString()
  user['username'] = user.email
  delete user['confirm']

  return (dispatch) => {
    return request({
      url: API_ACCOUNT_RESET_PASSWORD,
      method: 'post',
      data: user,
      responseType: 'json'
    }, (response) => {
      if (response.code === 0) {
        notify('Retrieve', 'Success, Please login with the email & password', 'success')
        dispatch({
          type: RETIREVE_SUCCESS,
          data: { retrieve: true }
        })
      } else {
        notify('Retrieve', 'Error:' + response.errorMsg, 'error')
      }
    }, (err) => {
      console.log('#server', err)
      notify('Retrieve', 'Network Error, Please try again', 'error')
    })
  }
}
