import {
  LIST_INVOICE_SUCCESS,
  LIST_PAYMENT_SUCCESS,
  CREATE_ORDER_SUCCESS,
  PAY_ORDER_SUCCESS
} from '../actions/order'

const initialState = {}

export default function reducer(state = initialState, action = {}) {

  const { data } = action
  Object.assign(initialState, data)

  switch (action.type) {
    case LIST_INVOICE_SUCCESS:
      return Object.assign({}, initialState, data)
    case LIST_PAYMENT_SUCCESS:
      return Object.assign({}, initialState, data)
    case CREATE_ORDER_SUCCESS:
      return Object.assign({}, initialState, data)
    case PAY_ORDER_SUCCESS:
      return Object.assign({}, initialState, data)
    default:
      return state
  }
}
