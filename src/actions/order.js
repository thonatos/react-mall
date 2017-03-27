import axios from 'axios'
import { API_SERVER_SHOP } from '../config/'

export const GET_ALL_META_SUCCESS = 'GET_ALL_META_SUCCESS'
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS'
export const PAY_ORDER_SUCCESS = 'PAY_ORDER_SUCCESS'
export const UPDATE_CART = 'UPDATE_CART'

const GET_ALL_META = API_SERVER_SHOP + '/meta/getAll'
const CREATE_ORDER = API_SERVER_SHOP + '/order/createOrder'
const PAY_ORDER = API_SERVER_SHOP + '/payment/payOrder'

function request(options, success, error) {
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

export function getAllMeta() {
  return (dispatch) => {
    return request({
      url: GET_ALL_META
    }, (data) => {
      if (data.code === 0) {
        dispatch({ type: GET_ALL_META_SUCCESS, data: data.data })
      }
    }, (response) => {
      console.log('#server', response)
    })
  }
}

export function createOrder(order) {
  console.log(order)
  return (dispatch) => {
    return request({
      url: CREATE_ORDER,
      method: 'post',
      data: order
    }, (data) => {
      if (data.code === 0) {
        dispatch({ type: CREATE_ORDER_SUCCESS, data: data.data })
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
      url: PAY_ORDER,
      method: 'post',
      data: order
    }, (data) => {
      if (data.code === 0) {
        dispatch({ type: PAY_ORDER_SUCCESS, data: data.data })
      }
    }, (response) => {
      console.log('#server', response)
    })
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

  return (dispatch) => {
    dispatch({
      type: UPDATE_CART,
      data: order
    })
  }
}