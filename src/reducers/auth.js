import { LOGIN_SUCCESS, LOGIN_ERROR } from '../actions/auth'

const initialState = {}

export default function reducer(state = initialState, action = {}) {
  const { data } = action
  switch (action.type) {
    case LOGIN_SUCCESS:
      return Object.assign({}, data)
    case LOGIN_ERROR:
      return Object.assign({}, data)
    default:
      return state
  }
}
