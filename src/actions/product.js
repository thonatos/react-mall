import axios from 'axios'
import { API_SERVER_SHOP } from '../config/'

export const FETCH_PRODUCT = 'FETCH_PRODUCT'
export const FETCH_PRODUCT_ERROR = 'FETCH_PRODUCT_ERROR'
export const FETCH_PRODUCT_SUCCESS = 'FETCH_PRODUCT_SUCCESS'

const FETCH_URL = API_SERVER_SHOP + '/product/getInfo'
const PRODUCTS = {
  'pro': 1,
  'nano': 2
}

function fetchSuccess(data) {
  if(data.code === 0){
    return {
      type: FETCH_PRODUCT_SUCCESS,
      data: data.data
    }
  }

  return {
    type: FETCH_PRODUCT_ERROR    
  }
}

function fetchError(data) {
  return {
    type: FETCH_PRODUCT_ERROR    
  }
}

export function fetchProduct(name) {  
  return (dispatch) => {    
    return axios({
      url: FETCH_URL,
      timeout: 20000,
      data: {
        id: PRODUCTS[name]
      },
      method: 'post',
      responseType: 'json',
      headers: {
        'X-Language': 'zh_cn'
      }
    }).then(function (response) {
      // console.log(response.data)
      dispatch(fetchSuccess(response.data))
    }).catch(function (response) {
      console.log('#server', response)
      dispatch(fetchError())
    })
  }
}