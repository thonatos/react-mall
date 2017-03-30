import {
  META_GET_ALL_SUCCESS,

  ORDER_CREATE_SUCCESS,
  ORDER_GET_USER_ORDERS_SUCCESS,

  CART_UPDATE,

  DELIVERY_ADD_SUCCESS,
  DELIVERY_LIST_SUCCESS,
  DELIVERY_DEL_SUCCESS,
  DELIVERY_UPDATE_SUCCESS
} from '../actions/order'

const initialState = {
  pagePayments: '',
  submitStatus: 'disabled',
  showPayModal: false,
  order: {
    id: ''
  },
  orders: {
    init: [],
    payed: [],
    prepared: [],
    onDelivery: [],
    success: [],
    canceled: []
  },
  cart: [],
  deliveries: [],
  payTypes: [],
  payChannels: [],
  invoiceTypes: [],
  shippingMethods: [],

}

const ORDER_STATE_ENUM = {
  '0': 'init',
  '1': 'payed',
  '2': 'prepared',
  '3': 'onDelivery',
  '9': 'success',
  '-1': 'canceled'
}

export default function reducer(state = initialState, action = {}) {

  const { data } = action
  const { deliveries } = state

  switch (action.type) {

    case META_GET_ALL_SUCCESS:
      // return Object.assign(state, data)
      return { ...state, ...data }

    case ORDER_CREATE_SUCCESS:
      return {
        ...state,
        order: data.order,
        showPayModal: true
      }

    case ORDER_GET_USER_ORDERS_SUCCESS:
      const { orderState } = action      
      const orderStateKey = ORDER_STATE_ENUM[orderState] 

      let ordersObject = {}
      ordersObject[orderStateKey] = [...data.orders]
      
      return {
        ...state,
        orders: ordersObject
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
        } else {
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
