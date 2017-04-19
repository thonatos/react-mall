import Cache from '../utils/cache'

import {
  META_GET_ALL_SUCCESS,

  ORDER_CREATE_SUCCESS,
  ORDER_CANCEL_SUCCESS,
  ORDER_GET_USER_ORDERS_SUCCESS,
  ORDER_GET_ORDER_INFO_SUCCESS,
  ORDER_COUNT_EXTRA_FEE_SUCCESS,

  CART_STATE_UPDATE,
  
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_PLUS_ITEM,
  CART_MINUS_ITEM,
  CART_CHANGE_ITEM,
  CART_RESET_ITEMS,
  CART_EXTRA_FEE_RESET,
  CART_GET_ITEMS_PRICE_SUCCESS,
  
  CART_RESET_ITEMS_ONCE,
  CART_ADD_ITEM_ONCE,
  CART_GET_ITEMS_ONCE_PRICE_SUCCESS,

  CART_ITEMS_TYPE_UPDATE,

  DELIVERY_ADD_SUCCESS,
  DELIVERY_LIST_SUCCESS,
  DELIVERY_DEL_SUCCESS,
  DELIVERY_UPDATE_SUCCESS,
  DELIVERY_GET_PRO_BATCH_SUCCESS,
  
} from '../actions/order'

const cache = new Cache()

const getInitialState = function () {

  const restoreCartItems = function () {
    let raw = cache.get('cart_items')
    return raw ? JSON.parse(raw) : []
  }

  const restoreCartItemsOnce = function () {
    let raw = cache.get('cart_items_once')
    return raw ? JSON.parse(raw) : []
  }  

  const restoreCartItemsType = function () {
    let raw = cache.get('cart_items_type')
    return raw ? raw : 'items' // once / ''
  }  


  const cart_items = restoreCartItems()
  const cart_items_once = restoreCartItemsOnce()
  const cart_items_type = restoreCartItemsType()
  
  // {namespace}_{class}_{type}_{action}
  
  return {

    detailOrder: {},
        
    cart_items: cart_items,
    cart_items_once: cart_items_once,
    cart_items_type: cart_items_type,     
    cart_payable: false,
    cart_extra_fee: {},
    cart_order: { id: '' },
    
    orders: {},
    deliveries: [],

    delivery_info: {},

    meta: {
      payTypes: [],
      payChannels: [],
      invoiceTypes: [],
      shippingMethods: [],
      pagePayments: ''
    }
  }

}

export default function reducer(state = getInitialState(), action = {}) {

  const { data } = action
  const { deliveries } = state

  switch (action.type) {

    case META_GET_ALL_SUCCESS:
      return {
        ...state,
        meta: {
          ...data
        }
      }

    case ORDER_GET_USER_ORDERS_SUCCESS:
      return {
        ...state,
        orders: data.orders
      }

    case ORDER_CREATE_SUCCESS:
      return {
        ...state,
        cart_order: data.order,        
        cart_payable: true
      }

    case ORDER_CANCEL_SUCCESS:
      let cancel_order = state.orders.filter((order) => {
        return order.id !== data
      })
      return {
        ...state,
        orders: cancel_order
      }


    case ORDER_GET_ORDER_INFO_SUCCESS:
      return {
        ...state,
        detailOrder: data.order
      }

    case ORDER_COUNT_EXTRA_FEE_SUCCESS:
      return {
        ...state,
        cart_extra_fee: { ...data }
      }

    case CART_EXTRA_FEE_RESET:
      return {
        ...state,
        cart_extra_fee: {}
      }

    case CART_STATE_UPDATE:
      return {
        ...state,        
        cart_items: data.cart || state.cart_items,
        cart_order: data.order || state.cart_order,
        cart_payable: data.cart_payable || false
      }

    case CART_ITEMS_TYPE_UPDATE:
      cache.set('cart_items_type', data)
      return {
        ...state,
        cart_items_type: data 
      }

    case CART_ADD_ITEM:
      let itemToAdd = data
      let itemToAddExist = false

      let itemsAfterAdd = state.cart_items.map((item, key) => {
        if (item._commodityId === itemToAdd._commodityId) {
          item.count += itemToAdd.count
          itemToAddExist = true
        }
        return item
      })
      if (!itemToAddExist) {
        itemsAfterAdd.push(itemToAdd)
      }

      cache.set('cart_items', JSON.stringify(itemsAfterAdd))

      return {
        ...state,        
        cart_items: itemsAfterAdd        
      }

    case CART_PLUS_ITEM:
      let itemToPlus = data

      let itemsAfterPlus = state.cart_items.map((item, key) => {
        if (item._commodityId === itemToPlus._commodityId) {
          item.count++
          item.count = item.count > 5 ? 5 : item.count
        }
        return item
      })

      cache.set('cart_items', JSON.stringify(itemsAfterPlus))

      return {
        ...state,        
        cart_items: itemsAfterPlus        
      }

    case CART_MINUS_ITEM:
      let itemToMinus = data
      let itemsAfterMinus = state.cart_items.map((item, key) => {
        if (item._commodityId === itemToMinus._commodityId) {
          item.count--
          item.count = item.count < 1 ? 1 : item.count
        }
        return item
      })

      cache.set('cart_items', JSON.stringify(itemsAfterMinus))

      return {
        ...state,        
        cart_items: itemsAfterMinus
      }

    case CART_CHANGE_ITEM:
      let itemToChange = data
      let itemsAfterChange = state.cart_items.map((item, key) => {
        if (item._commodityId === itemToChange._commodityId) {          
          return itemToChange
        }else{
          return item
        }
        
      })

      cache.set('cart_items', JSON.stringify(itemsAfterChange))

      return {
        ...state,        
        cart_items: itemsAfterChange        
      }

    case CART_REMOVE_ITEM:
      let itemToRemove = data
      let itemsAfterRemove = state.cart_items.filter((item) => {
        return item._commodityId !== itemToRemove._commodityId
      })

      cache.set('cart_items', JSON.stringify(itemsAfterRemove))

      return {
        ...state,
        cart_items: itemsAfterRemove        
      }

    case CART_RESET_ITEMS:
      cache.set('cart_items', JSON.stringify([]))
      return {
        ...state,
        cart_items: []
      }

    case CART_ADD_ITEM_ONCE:
      const itemsOnce = Array.of(data)
      cache.set('cart_items_once', JSON.stringify(itemsOnce))
      return {
        ...state,        
        cart_items_once: itemsOnce
      }

    case CART_RESET_ITEMS_ONCE:
      cache.set('cart_items_once', JSON.stringify([]))
      return {
        ...state,
        cart_items_once: []
      }

    case CART_GET_ITEMS_PRICE_SUCCESS:
      let new_items = state.cart_items.map((v, k) => {
        const id = v._commodityId
        v.price = data.prices[id]
        return v
      })

      return {
        ...state,
        cart_items: new_items
      }

    case CART_GET_ITEMS_ONCE_PRICE_SUCCESS:
      let items_once = state.cart_items_once.map((v, k) => {
        const id = v._commodityId
        v.price = data.prices[id]
        return v
      })

      return {
        ...state,
        cart_items_once: items_once
      }

    case DELIVERY_LIST_SUCCESS:
      return {
        ...state,
        deliveries: [...data.deliveries]
      }

    case DELIVERY_ADD_SUCCESS:
      return {
        ...state,
        deliveries: [...deliveries, data.delivery]
      }

    case DELIVERY_DEL_SUCCESS:
      let tmpDeliveries = deliveries.filter((item) => {
        return item.id !== data.delivery.id
      })
      return {
        ...state,
        deliveries: [...tmpDeliveries]
      }

    case DELIVERY_UPDATE_SUCCESS:
      let newDeliveries = deliveries.map((delivery) => {
        if (delivery.id === data.delivery.id) {
          return data.delivery
        } else {
          return delivery
        }
      })
      return {
        ...state,
        deliveries: [...newDeliveries]
      }

    case DELIVERY_GET_PRO_BATCH_SUCCESS:
      return {
        ...state,
        delivery_info: data
      }


    default:
      return state
  }
}
