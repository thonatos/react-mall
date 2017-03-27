import {
  GET_ALL_META_SUCCESS,
  CREATE_ORDER_SUCCESS,
  PAY_ORDER_SUCCESS,
  UPDATE_CART
} from '../actions/order'

const initialState = {
  submitStatus: 'disabled',
  showPayModal: false,
  delivery: 1,
  cart: []
}

export default function reducer(state = initialState, action = {}) {

  const { data } = action

  switch (action.type) {
    case GET_ALL_META_SUCCESS:
      Object.assign(initialState, data)
      return {
        ...state
      }
    case CREATE_ORDER_SUCCESS:
      Object.assign(initialState, data)
      return {
        ...state
      }
    case PAY_ORDER_SUCCESS:
      Object.assign(initialState, data)
      return {
        ...state
      }
    case UPDATE_CART:
      let cart = Array.of(data)
      return {
        ...state,
        cart: cart,
        submitStatus: cart.length > 0 ? null : 'disabled'
      }
    default:
      return state
  }
}
