import axios from 'axios'
import Cache from '../utils/cache'
import { Base64 } from 'js-base64'

const USER_LOGIN = 'https://api.insta360.com/user/v1/account/signin'

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_ERROR = 'LOGIN_ERROR'

// function authInit() {
//   function getInitialState() {
//     const cache = new Cache()
//     return cache.get('auth') || {
//       isLoggedIn: false,
//       profile: {}
//     }
//   }
//   return {
//     type: AUTH_INIT,
//     data: getInitialState()
//   }
// }

function setInitialState(state) {
  const cache = new Cache()
  cache.set(Base64.encode('auth'), Base64.encode(JSON.stringify(state)))
}

function loginSuccess(data) {
  if (data.code === 0) {
    const _data = Object.assign({
      isLoggedIn: true
    }, data.data)
    setInitialState(_data)
    return {
      type: LOGIN_SUCCESS,
      data: _data
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

// export function initAuth() {
//   return (dispatch) => {
//     dispatch(authInit())
//   }
// }

export function login(user) {
  // console.log('#action:auth:loginAuth')
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
