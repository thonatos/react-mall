import { API_SERVER_MALL } from '../config/'
import request from '../utils/request'

export const FETCH_PRODUCT = 'FETCH_PRODUCT'
export const FETCH_PRODUCT_ERROR = 'FETCH_PRODUCT_ERROR'
export const FETCH_PRODUCT_SUCCESS = 'FETCH_PRODUCT_SUCCESS'

const FETCH_URL = API_SERVER_MALL + '/product/getInfo'
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
    return request({
      url: FETCH_URL,      
      data: {
        id: PRODUCTS[name]
      },
      method: 'post',      
      language: true
    },(response) =>{      
      dispatch(fetchSuccess(response))
    }, (err)=> {
      console.log('#server', err)
      dispatch(fetchError())
    })
  }
}