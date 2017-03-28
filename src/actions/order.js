import axios from 'axios'
import { API_SERVER_SHOP } from '../config/'

function request(options, success, error) {

  // console.log(options)

  return axios({
    url: options.url,
    timeout: 20000,
    method: options.method || 'get',
    data: options.data || null,
    headers: {
      'X-Language': 'zh_cn',
      'X-User-Token': '64651b5085bf35f9f6e12ee462de8dfb'
    },
    responseType: 'json'
  }).then(function (response) {
    success(response.data)
  }).catch(function (response) {
    console.log('#server', response)
    error(response)
  })
}

// META
export const META_GET_ALL_SUCCESS = 'META_GET_ALL_SUCCESS'

const API_META_GET_ALL = API_SERVER_SHOP + '/meta/getAll'

export function getAllMeta() {
  return (dispatch) => {
    return request({
      url: API_META_GET_ALL
    }, (data) => {
      if (data.code === 0) {
        dispatch({ type: META_GET_ALL_SUCCESS, data: data.data })
      }
    }, (response) => {
      console.log('#server', response)
    })
  }
}

// ORDER
export const ORDER_CREATE_SUCCESS = 'ORDER_CREATE_SUCCESS'
export const ORDER_PAY_SUCCESS = 'ORDER_PAY_SUCCESS'

const API_ORDER_CREATE = API_SERVER_SHOP + '/order/createOrder'
const API_ORDER_PAY = API_SERVER_SHOP + '/payment/payOrder'

export function createOrder(order) {
  console.log(order)
  return (dispatch) => {
    return request({
      url: API_ORDER_CREATE,
      method: 'post',
      data: order
    }, (data) => {
      if (data.code === 0) {
        dispatch({ type: ORDER_CREATE_SUCCESS, data: data.data })
      }
    }, (response) => {
      console.log('#server', response)
    })
  }
}

export function payOrder(order) {
  console.log(order)
  return (dispatch) => {
    return request({
      url: API_ORDER_PAY,
      method: 'post',
      data: order
    }, (data) => {
      if (data.code === 0) {
        dispatch({ type: ORDER_PAY_SUCCESS, data: data.data })
      }
    }, (response) => {
      console.log('#server', response)
    })
  }
}

// CART
export const CART_UPDATE = 'CART_UPDATE'

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

const API_DELIVERY_ADD = API_SERVER_SHOP + '/account/addDelivery'
const API_DELIVERY_DEL = API_SERVER_SHOP + '/account/deleteDelivery'
const API_DELIVERY_LIST = API_SERVER_SHOP + '/account/listDelivery'
const API_DELIVERY_UPDATE = API_SERVER_SHOP + '/account/updateDelivery'

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
      method: 'post'
    }, (data) => {
      if (data.code === 0) {
        console.log(data)
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
      data: delivery
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
      data: delivery
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
      data: delivery
    }, (data) => {
      if (data.code === 0) {
        dispatch({ type: DELIVERY_DEL_SUCCESS, data: { delivery } })
      }
    }, (response) => {
      console.log('#server', response)
    })
  }
}