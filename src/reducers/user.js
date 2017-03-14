import { LOGIN } from '../actions/user'
import { LOGIN_ERROR } from '../actions/user'
import { LOGIN_SUCCESS } from '../actions/user'

const initialState = []

export default function reducer(state = initialState, action = {}) {
  const { data } = action  
  switch (action.type) {
    case LOGIN_SUCCESS:
      return [...data.data]
    case LOGIN_ERROR：
      return [...data.data]
    default:
      return state
  }
}
