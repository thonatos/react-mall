import { AUTH_INIT, AUTH_ERROR, AUTH_SUCCESS } from '../actions/auth'

const initialState = {}

export default function reducer(state = initialState, action = {}) {
  const { data } = action
  switch (action.type) {
    case AUTH_INIT:
      return Object.assign({}, data)
    case AUTH_SUCCESS:
      return Object.assign({}, data)
    case AUTH_ERROR:
      return Object.assign({}, data)
    default:
      return state
  }
}
