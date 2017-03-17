import axios from 'axios'
import { API_SERVER_USER } from '../config/'

const USER_LOGIN = API_SERVER_USER + '/account/signin'

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_ERROR = 'LOGIN_ERROR'

function getExpiretion() {
  return Math.ceil(Date.now() / 1000) + 60*30 // 30Min
}

function loginSuccess(data) {
  if (data.code === 0) {
    return {
      type: LOGIN_SUCCESS,
      data: Object.assign({
        isLoggedIn: true,
        expiration: getExpiretion()
      }, data.data)
    }
  }

  return {
    type: LOGIN_ERROR,
    data: {
      isLoggedIn: false,
      errorMsg: data.errorMsg
    }
  }
}

function loginError() {
  return {
    type: LOGIN_ERROR,
    data: {
      isLoggedIn: false,
      errorMsg: 'Server Error.'
    }
  }
}

export function login(user) {
  user['username'] = user.email
  return (dispatch) => {
    return axios({
      url: USER_LOGIN,
      timeout: 10000,
      method: 'post',
      data: user,
      responseType: 'json'
    }).then(function (response) {
      dispatch(loginSuccess(response.data))
    }).catch(function (response) {
      dispatch(loginError())
    })
  }
}
