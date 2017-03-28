import {
  META_GET_ALL_SUCCESS,

  ORDER_CREATE_SUCCESS,
  ORDER_PAY_SUCCESS,

  CART_UPDATE,

  DELIVERY_ADD_SUCCESS,
  DELIVERY_LIST_SUCCESS,
  DELIVERY_DEL_SUCCESS,
  DELIVERY_UPDATE_SUCCESS
} from '../actions/order'

const initialState = {
  submitStatus: 'disabled',
  showPayModal: false,
  deliveries: [],
  cart: []
}

export default function reducer(state = initialState, action = {}) {

  const { data } = action
  const { deliveries } = state

  switch (action.type) {

    case META_GET_ALL_SUCCESS:
      Object.assign(initialState, data)
      return {
        ...state
      }

    case ORDER_CREATE_SUCCESS:
      Object.assign(initialState, data)
      return {
        ...state
      }

    case ORDER_PAY_SUCCESS:
      Object.assign(initialState, data)
      return {
        ...state
      }

    case CART_UPDATE:
      let cart = Array.of(data)
      return {
        ...state,
        cart: cart,
        submitStatus: cart.length > 0 ? null : 'disabled'
      }

    case DELIVERY_LIST_SUCCESS:
      return {
        ...state,
        deliveries: [...data.deliveries]
      }

    case DELIVERY_ADD_SUCCESS:
      return {
        ...state,
        deliveries: [...deliveries, data.delivery]
      }

    case DELIVERY_DEL_SUCCESS:
      let tmpDeliveries = deliveries.filter((item) => {
        return item.id !== data.delivery.id
      })
      return {
        ...state,
        deliveries: [...tmpDeliveries]
      }

    case DELIVERY_UPDATE_SUCCESS:
      let newDeliveries = deliveries.map((delivery) => {
        if (delivery.id === data.delivery.id) {
          return data.delivery
        }else{
          return delivery
        }
      })
      return {
        ...state,
        deliveries: [...newDeliveries]
      }

    default:
      return state
  }
}
