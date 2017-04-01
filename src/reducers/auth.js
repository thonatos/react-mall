import {
  AUTH_RESTORE,
  LOGIN_SUCCESS,
  REGISTER_SUCCESS

} from '../actions/auth'

const initialState = {
  isLoggedIn: false,
  expiration: 0,
  token: '',
  email: '',
  register: false,
  retrieve: false
}

export default function reducer(state = initialState, action = {}) {
  const { data } = action
  switch (action.type) {
    case AUTH_RESTORE:
      return { ...state, ...data }
    case LOGIN_SUCCESS:
      return { ...state, ...data }
    case REGISTER_SUCCESS:
      return {
        ...state,
        register: data.register
      }
    default:
      return state
  }
}
