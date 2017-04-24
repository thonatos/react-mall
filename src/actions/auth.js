import { notification } from 'antd'
import md5 from 'crypto-js/md5'
import request from '../utils/request'
import { LANG, SERVER } from '../locales/'

const { API_SERVER_USER } = SERVER

function getExpiretion() {
  return Math.ceil(Date.now() / 1000) + 60 * 60 * 24 // 30Min
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


// ACTION
export const AUTH_ACTION = 'AUTH_ACTION'
export function updateAuthAction(action) {
  return (dispatch) => {
    dispatch({
      type: AUTH_ACTION,
      data: action
    })
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
        notify(LANG.auth_captcha_title, LANG.auth_captcha_send_success, 'success')
      } else {
        console.log(response.errorMsg)
        notify(LANG.auth_captcha_title, LANG.auth_captcha_send_failed, 'error')
      }
    }, (err) => {
      console.log('#server', err)
      notify(LANG.network_error_title, LANG.network_error_tips, 'error')
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
        
        notify(LANG.auth_login_success_title, LANG.auth_login_success, 'success')

        dispatch({
          type: LOGIN_SUCCESS,
          data: state
        })

      } else {
        notify(LANG.auth_login_failed_title, LANG.auth_login_failed, 'error')
      }
    }, (err) => {
      console.log('#server', err)
      notify(LANG.network_error_title, LANG.network_error_tips, 'error')
    })
  }
}

// SIGNUP
const API_ACCOUNT_SIGNUP = API_SERVER_USER + '/account/signup'
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'

export function register(user) {
  user['source'] = 'mall'
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
        let state = Object.assign({
          email: user.email,
          isLoggedIn: true,
          expiration: getExpiretion()
        }, response.data)

        notify(LANG.auth_register_success_title, LANG.auth_register_success, 'success')

        dispatch({
          type: REGISTER_SUCCESS,
          data: state
        })

      } else {
        notify(LANG.auth_register_failed_title, LANG.auth_register_failed, 'error')
      }
    }, (err) => {
      console.log('#server', err)
      notify(LANG.network_error_title, LANG.network_error_tips, 'error')
    })
  }
}

// RETIREVE
const API_ACCOUNT_RESET_PASSWORD = API_SERVER_USER + '/account/resetPassword'
export const RETIREVE_SUCCESS = 'RETIREVE_SUCCESS'

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
        notify(LANG.auth_retrieve_success_title, LANG.auth_retrieve_success, 'success')
        dispatch({
          type: RETIREVE_SUCCESS,
          data: { retrieve: true }
        })
      } else {
        notify(LANG.auth_retrieve_failed_title, LANG.auth_retrieve_failed, 'error')
      }
    }, (err) => {
      console.log('#server', err)
      notify(LANG.network_error_title, LANG.network_error_tips, 'error')
    })
  }
}

// LOGOUT
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export function logout() {
  return (dispatch) => {    
    dispatch({
      type: LOGOUT_SUCCESS,
      data: {}
    })
  }
}

export const COMMON_REDIRECT = 'COMMON_REDIRECT'
export function setRedirect(target){
  return (dispatch) =>{
    dispatch({
      type: COMMON_REDIRECT,
      data: target
    })
  }
}