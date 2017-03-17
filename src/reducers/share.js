import { UPDATE_CART } from '../actions/share'

const initialState = {}

export default function reducer(state = initialState, action = {}) {    
  const { data } = action
  switch (action.type) {
    case UPDATE_CART:
      return Object.assign({}, {
        cart: data
      })
    default:
      return state
  }
}
