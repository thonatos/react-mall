import {
  LOGIN_SUCCESS,
  LOGIN_ERROR
} from '../actions/auth'

import Cache from '../utils/cache'

const initialState = {}

function getInitialState() {
  const cache = new Cache()
  return cache.get('auth') || {
    isLoggedIn: false,
    profile: {}
  }
}

function setInitialState(state) {
  const cache = new Cache()
  cache.set('auth', JSON.stringify(state))
}

export default function reducer(state = initialState, action = {}) {
  const { data } = action
  switch (action.type) {
    case LOGIN_SUCCESS:
      setInitialState(data)
      return Object.assign({}, data)
    case LOGIN_ERROR:
      return Object.assign({}, data)
    default:
      return state
  }
}
