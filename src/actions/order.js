import axios from 'axios'

export const LIST_INVOICE_SUCCESS = 'LIST_INVOICE_SUCCESS'
export const LIST_PAYMENT_SUCCESS = 'LIST_PAYMENT_SUCCESS'
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS'
export const PAY_ORDER_SUCCESS = 'PAY_ORDER_SUCCESS'

const API_SERVER = 'http://192.168.8.184:8866/shop/v1'
const LIST_INVOICE = API_SERVER + '/meta/listInvoiceType'
const LIST_PAYMENT = API_SERVER + '/meta/listPayType'
const CREATE_ORDER = API_SERVER + '/order/createOrder'
const PAY_ORDER = API_SERVER + '/payment/payOrder'

export function listInvoice() {  
  return (dispatch) => {    
    return axios({
      url: LIST_INVOICE,
      timeout: 20000,
      method: 'get',
      responseType: 'json'
    }).then(function (response) {      
      const data = response.data
      if(data.code === 0){      
          dispatch({type: LIST_INVOICE_SUCCESS, data: data.data})
      }    
    }).catch(function (response) {
      console.log('#server', response)      
    })
  }
}

export function listPayment() {  
  return (dispatch) => {    
    return axios({
      url: LIST_PAYMENT,
      timeout: 20000,
      method: 'get',
      responseType: 'json'
    }).then(function (response) { 
      const data = response.data     
      if(data.code === 0){      
          dispatch({type: LIST_PAYMENT_SUCCESS, data: data.data})
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
      responseType: 'json'
    }).then(function (response) { 
      const data = response.data     
      console.log(data)
      if(data.code === 0){              
          dispatch({type: CREATE_ORDER_SUCCESS, data: data.data})
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
      responseType: 'json'
    }).then(function (response) { 
      const data = response.data     
      console.log(data)
      if(data.code === 0){              
          dispatch({type: PAY_ORDER_SUCCESS, data: data.data})
      }
    }).catch(function (response) {
      console.log('#server', response)
    })
  }
}