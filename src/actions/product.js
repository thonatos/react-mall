import axios from 'axios'
import { products } from '../data/'

export const FETCH = 'FETCH'
export const FETCH_ERROR = 'FETCH_ERROR'
export const FETCH_SUCCESS = 'FETCH_SUCCESS'

const FETCH_URL = 'https://api.insta360.com'

function fetchStart() {
  return {
    type: FETCH
  }
}

function fetchSuccess(data) {
  return {
    type: FETCH_SUCCESS,
    data: data
  }
}

function fetchError(data) {
  return {
    type: FETCH_ERROR,
    data: data
  }
}

export function fetch(product) {

  if (process.env.NODE_ENV === 'production') {
    // pro
    return (dispatch) => {
      dispatch(fetchStart())
      return axios({
        url: FETCH_URL,
        timeout: 20000,
        method: 'get',
        responseType: 'json'
      }).then(function (response) {
        dispatch(fetchSuccess(response.data.data))
      }).catch(function (response) {
        dispatch(fetchError(response.data.data))
      })
    }

  } else {
    // dev
    console.log('#action:product:fetch', products)
    if (products[product]) {
      return (dispatch) => {
        setTimeout(function () {
          return dispatch(fetchSuccess(products[product]))
        }, 3000)
      }
    } else {
      return (dispatch) => {
        return dispatch(fetchError({}))
      }
    }
  }
  
}