import { LIST_INVOICE_SUCCESS, LIST_PAYMENT_SUCCESS, CREATE_ORDER_SUCCESS , PAY_ORDER_SUCCESS} from '../actions/order'

const initialState = {}

export default function reducer(state = initialState, action = {}) {
  const { data } = action
  switch (action.type) {
    case LIST_INVOICE_SUCCESS:
      Object.assign(initialState, data)
      return Object.assign({}, initialState, data)
    case LIST_PAYMENT_SUCCESS:
      Object.assign(initialState, data)
      return Object.assign({}, initialState, data)
    case CREATE_ORDER_SUCCESS:
      Object.assign(initialState, data)
      return Object.assign({}, initialState, data)    
    case PAY_ORDER_SUCCESS:
      Object.assign(initialState, data)
      return Object.assign({}, initialState, data)          
    default:
      return state
  }
}
