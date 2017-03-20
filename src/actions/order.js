import axios from 'axios'
import { API_SERVER_SHOP } from '../config/'

export const GET_ALL_META_SUCCESS = 'GET_ALL_META_SUCCESS'
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS'
export const PAY_ORDER_SUCCESS = 'PAY_ORDER_SUCCESS'

const GET_ALL_META = API_SERVER_SHOP + '/meta/getAll'
const CREATE_ORDER = API_SERVER_SHOP + '/order/createOrder'
const PAY_ORDER = API_SERVER_SHOP + '/payment/payOrder'


export function getAllMeta() {
  return (dispatch) => {
    return axios({
      url: GET_ALL_META,
      timeout: 20000,
      method: 'get',
      headers: {
        'X-Language': 'zh_cn'
      },      
      responseType: 'json'
    }).then(function (response) {
      const data = response.data
      if (data.code === 0) {
        dispatch({ type: GET_ALL_META_SUCCESS, data: data.data })
      }
    }).catch(function (response) {
      console.log('#server', response)
    })
  }
}

export function createOrder(order) {
  console.log(order)
  return (dispatch) => {
    return axios({
      url: CREATE_ORDER,
      timeout: 20000,
      method: 'post',
      data: order,
      headers: {
        'X-User-Token': '64651b5085bf35f9f6e12ee462de8dfb'
      },      
      responseType: 'json'
    }).then(function (response) {
      const data = response.data
      console.log(data)
      if (data.code === 0) {
        dispatch({ type: CREATE_ORDER_SUCCESS, data: data.data })
      }
    }).catch(function (response) {
      console.log('#server', response)
    })
  }
}

export function payOrder(order) {
  console.log(order)
  return (dispatch) => {
    return axios({
      url: PAY_ORDER,
      timeout: 20000,
      method: 'post',
      data: order,
      headers: {
        'X-User-Token': '64651b5085bf35f9f6e12ee462de8dfb'
      },      
      responseType: 'json'
    }).then(function (response) {
      const data = response.data
      console.log(data)
      if (data.code === 0) {
        dispatch({ type: PAY_ORDER_SUCCESS, data: data.data })
      }
    }).catch(function (response) {
      console.log('#server', response)
    })
  }
}