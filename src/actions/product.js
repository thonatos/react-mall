import { SERVER } from '../locales/'
import request from '../utils/request'

const { API_SERVER_MALL } = SERVER

export const FETCH_PRODUCT_SUCCESS = 'FETCH_PRODUCT_SUCCESS'

const FETCH_URL = API_SERVER_MALL + '/product/getInfo'

export function fetchProduct(id) {  
  return (dispatch) => {    
    return request({
      url: FETCH_URL,      
      data: {
        id: id
      },
      method: 'post',      
      language: true
    },(response) =>{      
      if (response.code === 0) {
          dispatch({
            type: 'FETCH_PRODUCT_SUCCESS',
            data: response.data
          })
      }      
    }, (err)=> {
      console.log('#server', err)      
    })
  }
}