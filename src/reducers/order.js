import {
  GET_ALL_META_SUCCESS,
  CREATE_ORDER_SUCCESS,
  PAY_ORDER_SUCCESS
} from '../actions/order'

const initialState = {}

export default function reducer(state = initialState, action = {}) {

  const { data } = action
  Object.assign(initialState, data)

  switch (action.type) {
    case GET_ALL_META_SUCCESS:
      return Object.assign({}, initialState, data)
    case CREATE_ORDER_SUCCESS:
      return Object.assign({}, initialState, data)
    case PAY_ORDER_SUCCESS:
      return Object.assign({}, initialState, data)
    default:
      return state
  }
}
