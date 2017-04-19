import { API_SERVER_MALL, PAGE_SERVER_PAYMENT } from '../config/'
import request from '../utils/request'

// META
export const META_GET_ALL_SUCCESS = 'META_GET_ALL_SUCCESS'
const API_META_GET_ALL = API_SERVER_MALL + '/meta/getAll'

export function getAllMeta() {
  return (dispatch) => {
    return request({
      url: API_META_GET_ALL,
      token: true
    }, (data) => {
      if (data.code === 0) {
        dispatch({ 
          type: META_GET_ALL_SUCCESS, 
          data: { 
            ...data.data, 
            pagePayments: PAGE_SERVER_PAYMENT 
          } 
        })
      }
    }, (response) => {
      console.log('#server', response)
    })
  }
}

// ORDER
export const ORDER_CREATE_SUCCESS = 'ORDER_CREATE_SUCCESS'
export const ORDER_CANCEL_SUCCESS = 'ORDER_CANCEL_SUCCESS'
export const ORDER_REFUND_SUCCESS = 'ORDER_REFUND_SUCCESS'
export const ORDER_GET_USER_ORDERS_SUCCESS = 'ORDER_GET_USER_ORDERS_SUCCESS'
export const ORDER_GET_ORDER_INFO_SUCCESS = 'ORDER_GET_ORDER_INFO_SUCCESS'
export const ORDER_GET_INVOICE_MAILTO_SUCCESS = 'ORDER_GET_INVOICE_MAILTO_SUCCESS'
export const ORDER_COUNT_EXTRA_FEE_SUCCESS = 'ORDER_COUNT_EXTRA_FEE_SUCCESS'

const API_ORDER_CREATE = API_SERVER_MALL + '/order/createOrder'
const API_ORDER_CANCEL = API_SERVER_MALL + '/order/cancelOrder'
const API_ORDER_REFUND = API_SERVER_MALL + '/order/refundOrder'

const API_ORDER_GET_USER_ORDERS = API_SERVER_MALL + '/order/getUserOrders'
const API_ORDER_GET_ORDER_INFO = API_SERVER_MALL + '/order/getOrderInfo'
const API_ORDER_COUNT_EXTRA_FEE = API_SERVER_MALL + '/order/getOrderSheetExtra'
const API_ORDER_GET_INVOICE_MAILTO = API_SERVER_MALL + '/meta/getRequestInvoiceMailto'

export function createOrder(order) {
  return (dispatch) => {
    return request({
      url: API_ORDER_CREATE,
      method: 'post',
      data: order,
      token: true
    }, (data) => {
      if (data.code === 0) {
        console.log(data.data)
        dispatch({ type: ORDER_CREATE_SUCCESS, data: data.data })
      }
    }, (response) => {
      console.log('#server', response)
    })
  }
}

export function payOrder(order) {
  return (dispatch) => {
    return request({
      url: API_ORDER_CANCEL,
      method: 'post',
      data: order,
      token: true
    }, (data) => {
      if (data.code === 0) {
        dispatch({ type: ORDER_CANCEL_SUCCESS, data: order.id })
      }
    }, (response) => {
      console.log('#server', response)
    })
  }
}

export function cancelOrder(order) {
  return (dispatch) => {
    return request({
      url: API_ORDER_CANCEL,
      method: 'post',
      data: order,
      token: true
    }, (data) => {
      if (data.code === 0) {
        dispatch({ type: ORDER_CANCEL_SUCCESS, data: order.id })
      }
    }, (response) => {
      console.log('#server', response)
    })
  }
}

export function refundOrder(order){
    return (dispatch) => {
    return request({
      url: API_ORDER_REFUND,
      method: 'post',
      data: order,
      token: true
    }, (data) => {
      if (data.code === 0) {
        dispatch({ type: ORDER_REFUND_SUCCESS, data:  data.data.order})
      }
    }, (response) => {
      console.log('#server', response)
    })
  }
}

export function getInvoiceMailto(){
    return (dispatch) => {
    return request({
      url: API_ORDER_GET_INVOICE_MAILTO,
      method: 'get',      
      token: false
    }, (data) => {
      if (data.code === 0) {
        dispatch({ type: ORDER_GET_INVOICE_MAILTO_SUCCESS, data: data.data })
      }
    }, (response) => {
      console.log('#server', response)
    })
  }
} 


export function countOrderExtraFee(order) {
  return (dispatch) => {
    return request({
      url: API_ORDER_COUNT_EXTRA_FEE,
      method: 'post',
      data: order,
      token: true
    }, (data) => {
      if (data.code === 0) {
        dispatch({ type: ORDER_COUNT_EXTRA_FEE_SUCCESS, data: data.data })
      }
    }, (response) => {
      console.log('#server', response)
    })
  }
}

export function getUserOrders() {
  return (dispatch) => {
    return request({
      url: API_ORDER_GET_USER_ORDERS,
      method: 'post',
      data: {},
      token: true
    }, (data) => {
      if (data.code === 0) {
        dispatch({ type: ORDER_GET_USER_ORDERS_SUCCESS, data: data.data })
      }
    }, (response) => {
      console.log('#server', response)
    })
  }
}

export function getOrderInfo(id) {
  return (dispatch) => {
    return request({
      url: API_ORDER_GET_ORDER_INFO,
      method: 'post',
      data: {
        id: id
      },
      token: true
    }, (data) => {
      if (data.code === 0) {
        dispatch({ type: ORDER_GET_ORDER_INFO_SUCCESS, data: data.data })
      }
    }, (response) => {
      console.log('#server', response)
    })
  }
}

// CART
export const CART_STATE_UPDATE = 'CART_STATE_UPDATE'

export const CART_ADD_ITEM = 'CART_ADD_ITEM'
export const CART_PLUS_ITEM = 'CART_PLUS_ITEM'
export const CART_MINUS_ITEM = 'CART_MINUS_ITEM'
export const CART_REMOVE_ITEM = 'CART_REMOVE_ITEM'
export const CART_CHANGE_ITEM = 'CART_CHANGE_ITEM'
export const CART_RESET_ITEMS = 'CART_RESET_ITEMS'
export const CART_EXTRA_FEE_RESET = 'CART_EXTRA_FEE_RESET'
export const CART_GET_ITEMS_PRICE_SUCCESS = 'CART_GET_ITEMS_PRICE_SUCCESS'

export const CART_ADD_ITEM_ONCE = 'CART_ADD_ITEM_ONCE'
export const CART_RESET_ITEMS_ONCE = 'CART_RESET_ITEMS_ONCE'
export const CART_ITEMS_TYPE_UPDATE = 'CART_ITEMS_TYPE_UPDATE'
export const CART_GET_ITEMS_ONCE_PRICE_SUCCESS = 'CART_GET_ITEMS_ONCE_PRICE_SUCCESS'

const API_CART_GET_PRICE = API_SERVER_MALL + '/product/getCommodityPriceInArea'

export function getCartPrice(items, type) {
  return (dispatch) => {
    return request({
      url: API_CART_GET_PRICE,
      method: 'post',
      token: true,
      data: items
    }, (data) => {
      if (data.code === 0) {        
        dispatch({ 
          type: type ==='once' ? CART_GET_ITEMS_ONCE_PRICE_SUCCESS : CART_GET_ITEMS_PRICE_SUCCESS,
          data: data.data })        
      }
    }, (response) => {
      console.log('#server', response)
    })
  }
}

export function updateCartState(state) {
  return (dispatch) => {
    dispatch({
      type: CART_STATE_UPDATE,
      data: state
    })
  }
}

export function updateCartItemsType(type) {
  return (dispatch) => {
    dispatch({
      type: CART_ITEMS_TYPE_UPDATE,
      data: type
    })
  }
}

export function addToCart(data, type) {
  const new_item = {
    name: data.product.info.name,
    key: data.commodity.id,
    thumb: data.product.displays[0].url,
    price: data.commodity.price,
    count: data.count,
    commodity: data.commodity,
    _productId: data.product.id,
    _commodityId: data.commodity.id
  }
  return (dispatch) => {
    dispatch({
      type: type ==='once' ? CART_ADD_ITEM_ONCE : CART_ADD_ITEM,
      data: new_item
    })
  }
}

export function removeFromCart(item) {
  return (dispatch) => {
    dispatch({
      type: CART_REMOVE_ITEM,
      data: item
    })
  }
}


export function minusCartItem(item) {
  return (dispatch) => {
    dispatch({
      type: CART_MINUS_ITEM,
      data: item
    })
  }
}

export function plusCartItem(item) {
  return (dispatch) => {
    dispatch({
      type: CART_PLUS_ITEM,
      data: item
    })
  }
}

export function changeCartItem(item) {
  return (dispatch) => {
    dispatch({
      type: CART_CHANGE_ITEM,
      data: item
    })
  }
}

export function resetCartItems() {
  return (dispatch) => {
    dispatch({
      type: CART_RESET_ITEMS,
      data: []
    })
  }
}

export function resetCartItemsOnce() {
  return (dispatch) => {
    dispatch({
      type: CART_RESET_ITEMS_ONCE,
      data: []
    })
  }
}

export function resetCartExtraFee(){
  return (dispatch)=>{
    dispatch({
      type: CART_EXTRA_FEE_RESET
    })
  }
}

// DELIVERY
export const DELIVERY_ADD_SUCCESS = 'DELIVERY_ADD_SUCCESS'
export const DELIVERY_DEL_SUCCESS = 'DELIVERY_DEL_SUCCESS'
export const DELIVERY_LIST_SUCCESS = 'DELIVERY_LIST_SUCCESS'
export const DELIVERY_UPDATE_SUCCESS = 'DELIVERY_UPDATE_SUCCESS'
export const DELIVERY_GET_PRO_BATCH_SUCCESS = 'DELIVERY_GET_PRO_BATCH_SUCCESS'

const API_DELIVERY_ADD = API_SERVER_MALL + '/account/addDelivery'
const API_DELIVERY_DEL = API_SERVER_MALL + '/account/deleteDelivery'
const API_DELIVERY_LIST = API_SERVER_MALL + '/account/listDelivery'
const API_DELIVERY_UPDATE = API_SERVER_MALL + '/account/updateDelivery'
const API_DELIVERY_GET_PRO_BATCH = API_SERVER_MALL + '/delivery/getProBatch'

export function getProBatch() {
  return (dispatch) => {
    return request({
      url: API_DELIVERY_GET_PRO_BATCH,
      method: 'get'
    }, (data) => {
      if (data.code === 0) {
        dispatch({ type: DELIVERY_GET_PRO_BATCH_SUCCESS, data: data.data })
      }
    }, (response) => {
      console.log('#server', response)
    })
  }
}

export function listDelivery() {
  return (dispatch) => {
    return request({
      url: API_DELIVERY_LIST,
      method: 'post',
      token: true
    }, (data) => {
      if (data.code === 0) {
        dispatch({ type: DELIVERY_LIST_SUCCESS, data: data.data })
      }
    }, (response) => {
      console.log('#server', response)
    })
  }
}

export function addDelivery(delivery) {  
  return (dispatch) => {
    return request({
      url: API_DELIVERY_ADD,
      method: 'post',
      data: delivery,
      token: true
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
  return (dispatch) => {
    return request({
      url: API_DELIVERY_UPDATE,
      method: 'post',
      data: delivery,
      token: true
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
      data: delivery,
      token: true
    }, (data) => {
      if (data.code === 0) {
        dispatch({ type: DELIVERY_DEL_SUCCESS, data: { delivery } })
      }
    }, (response) => {
      console.log('#server', response)
    })
  }
}