import axios from 'axios'
import { products } from '../data/'

export const FETCH = 'FETCH'
export const FETCH_ERROR = 'FETCH_ERROR'
export const FETCH_SUCCESS = 'FETCH_SUCCESS'

const FETCH_URL = 'https://api.insta360.com'

function start() {
  return {
    type: FETCH
  }
}

function success(data) {
  return {
    type: FETCH_SUCCESS,
    data: data
  }
}

function error(data) {
  return {
    type: FETCH_ERROR,
    data: data
  }
}

export function fetch(product) {

  if (process.env.NODE_ENV === 'production') {

    // pro
    return (dispatch) => {
      dispatch(start())
      return axios({
        url: FETCH_URL,
        timeout: 20000,
        method: 'get',
        responseType: 'json'
      }).then(function (response) {
        dispatch(success(response.data.data))
      }).catch(function (response) {
        dispatch(error(response.data.data))
      })
    }

  } else {

    // dev
    console.log('#action:product:fetch', products)
    if (products[product]) {
      return (dispatch) => {
        setTimeout(function () {
          return dispatch(success(products[product]))
        }, 3000)
      }
    } else {
      return (dispatch) => {
        return dispatch(error({}))
      }
    }

  }
}