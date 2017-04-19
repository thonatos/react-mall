import { FETCH_PRODUCT_SUCCESS } from '../actions/product'

const initialState = {
  loading: true,
  detail: {}
}

export default function reducer(state = initialState, action = {}) {
  const { data } = action
  switch (action.type) {
    case FETCH_PRODUCT_SUCCESS:
      return {
        ...state,
        detail: data.product,
        loading: false
      }
    default:
      return state
  }
}
