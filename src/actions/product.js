import axios from 'axios'

export const FETCH = 'FETCH'
export const FETCH_ERROR = 'FETCH_ERROR'
export const FETCH_SUCCESS = 'FETCH_SUCCESS'

const FETCH_URL = 'http://192.168.8.242:8866/shop/v1/product/getInfo'
// import { products } from '../data/'

const PRODUCTS = {
  'pro': 1,
  'nano': 2
}

function fetchSuccess(data) {
  if(data.code === 0){
    return {
      type: FETCH_SUCCESS,
      data: data.data
    }
  }

  return {
    type: FETCH_ERROR    
  }
}

function fetchError(data) {
  return {
    type: FETCH_ERROR    
  }
}

export function fetch(product) {  
  return (dispatch) => {    
    return axios({
      url: FETCH_URL,
      timeout: 20000,
      data: {
        id: PRODUCTS[product]
      },
      method: 'post',
      responseType: 'json'
    }).then(function (response) {
      console.log(response.data)
      dispatch(fetchSuccess(response.data))
    }).catch(function (response) {
      console.log('#server', response)
      dispatch(fetchError())
    })
  }
}