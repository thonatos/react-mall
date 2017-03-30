import Cache from '../utils/cache'
import { API_SERVER_USER } from '../config/'
import request from '../utils/request'

const cache = new Cache()

const USER_LOGIN = API_SERVER_USER + '/account/signin'

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_ERROR = 'LOGIN_ERROR'

function getExpiretion() {
  return Math.ceil(Date.now() / 1000) + 60 * 30 // 30Min
}

function loginSuccess(data) {
  if (data.code === 0) {

    let state = Object.assign({
      isLoggedIn: true,
      expiration: getExpiretion()
    }, data.data)

    cache.set('auth', JSON.stringify(state))

    return {
      type: LOGIN_SUCCESS,
      data: state
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
    return request({
      url: USER_LOGIN,
      method: 'post',
      data: user,
      responseType: 'json'
    }, (response) => {
      dispatch(loginSuccess(response))
    }, (err) => {
      console.log('#server', err)
      dispatch(loginError())
    })
  }
}
