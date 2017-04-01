import Cache from '../utils/cache'
import { API_SERVER_MALL, PAGE_SERVER_PAYMENT } from '../config/'
import request from '../utils/request'

const cache = new Cache()
const auth = cache.get('auth')
const token = auth ? JSON.parse(auth).token : ''

// META
export const META_GET_ALL_SUCCESS = 'META_GET_ALL_SUCCESS'

const API_META_GET_ALL = API_SERVER_MALL + '/meta/getAll'

export function getAllMeta() {
  return (dispatch) => {
    return request({
      url: API_META_GET_ALL,
      token: token
    }, (data) => {
      if (data.code === 0) {
        dispatch({ type: META_GET_ALL_SUCCESS, data: { ...data.data, pagePayments: PAGE_SERVER_PAYMENT } })
      }
    }, (response) => {
      console.log('#server', response)
    })
  }
}

// ORDER
export const ORDER_CREATE_SUCCESS = 'ORDER_CREATE_SUCCESS'
export const ORDER_GET_USER_ORDERS_SUCCESS = 'ORDER_GET_USER_ORDERS_SUCCESS'

const API_ORDER_CREATE = API_SERVER_MALL + '/order/createOrder'
const API_ORDER_GET_USER_ORDERS = API_SERVER_MALL + '/order/getUserOrders'

export function createOrder(order) {
  return (dispatch) => {
    return request({
      url: API_ORDER_CREATE,
      method: 'post',
      data: order,
      token: token
    }, (data) => {
      if (data.code === 0) {
        dispatch({ type: ORDER_CREATE_SUCCESS, data: data.data })
      }
    }, (response) => {
      console.log('#server', response)
    })
  }
}

export function getUserOrders(state) {  
  return (dispatch) => {
    return request({
      url: API_ORDER_GET_USER_ORDERS,
      method: 'post',
      data: {
        state: state
      },
      token: token
    }, (data) => {
      if (data.code === 0) {
        dispatch({ type: ORDER_GET_USER_ORDERS_SUCCESS, data: data.data , orderState: state})
      }
    }, (response) => {
      console.log('#server', response)
    })
  }
}

// INFO

export const ORDER_UPDATE = 'ORDER_UPDATE'

export function updateOrder(data) {  
  return (dispatch) => {
    dispatch({
      type: ORDER_UPDATE,
      data: data
    })
  }
}

// CART
export const CART_UPDATE = 'CART_UPDATE'

export function restoreCart(data) {
  const raw = cache.get('cart')
  const order = raw ? JSON.parse(raw) : false
  if(order){    
    return (dispatch) => {
      dispatch({
        type: CART_UPDATE,
        data: order
      })
    }
  } 
}

export function updateCart(data) {
  const order = {
    name: data.product.info.name,
    key: data.product.info.name,
    thumb: data.product.displays[0].url,
    price: data.commodity.price,
    count: 1,
    _productId: data.product.product.id,
    _commodityId: data.commodity.id
  }

  cache.set('cart', JSON.stringify(order))
  return (dispatch) => {
    dispatch({
      type: CART_UPDATE,
      data: order
    })
  }
}

// DELIVERY
export const DELIVERY_ADD_SUCCESS = 'DELIVERY_ADD_SUCCESS'
export const DELIVERY_DEL_SUCCESS = 'DELIVERY_DEL_SUCCESS'
export const DELIVERY_LIST_SUCCESS = 'DELIVERY_LIST_SUCCESS'
export const DELIVERY_UPDATE_SUCCESS = 'DELIVERY_UPDATE_SUCCESS'

const API_DELIVERY_ADD = API_SERVER_MALL + '/account/addDelivery'
const API_DELIVERY_DEL = API_SERVER_MALL + '/account/deleteDelivery'
const API_DELIVERY_LIST = API_SERVER_MALL + '/account/listDelivery'
const API_DELIVERY_UPDATE = API_SERVER_MALL + '/account/updateDelivery'

function serilizerData(formData) {
  if (formData.city) {
    const tmp = formData.city.map((v, k) => {
      return v.replace('_', ' ')
    })
    formData.city = tmp.join('/')
  }
  return formData
}

export function listDelivery() {
  return (dispatch) => {
    return request({
      url: API_DELIVERY_LIST,
      method: 'post',
      token: token
    }, (data) => {
      if (data.code === 0) {
        dispatch({ type: DELIVERY_LIST_SUCCESS, data: data.data })
      }
    }, (response) => {
      console.log('#server', response)
    })
  }
}

export function addDelivery(delivery) {
  serilizerData(delivery)
  return (dispatch) => {
    return request({
      url: API_DELIVERY_ADD,
      method: 'post',
      data: delivery,
      token: token
    }, (data) => {
      if (data.code === 0) {
        dispatch({ type: DELIVERY_ADD_SUCCESS, data: data.data })
      }
    }, (response) => {
      console.log('#server', response)
    })
  }
}

export function updateDelivery(delivery) {
  serilizerData(delivery)
  return (dispatch) => {
    return request({
      url: API_DELIVERY_UPDATE,
      method: 'post',
      data: delivery,
      token: token
    }, (data) => {
      if (data.code === 0) {
        dispatch({ type: DELIVERY_UPDATE_SUCCESS, data: data.data })
      }
    }, (response) => {
      console.log('#server', response)
    })
  }
}

export function delDelivery(delivery) {
  return (dispatch) => {
    return request({
      url: API_DELIVERY_DEL,
      method: 'post',
      data: delivery,
      token: token
    }, (data) => {
      if (data.code === 0) {
        dispatch({ type: DELIVERY_DEL_SUCCESS, data: { delivery } })
      }
    }, (response) => {
      console.log('#server', response)
    })
  }
}