import { FETCH_SUCCESS } from '../actions/product'

const initialState = {}

export default function reducer(state = initialState, action = {}) {

  console.log('#action', action)

  const { data } = action
  switch (action.type) {    
    case FETCH_SUCCESS:
      return Object.assign({}, data)
    default:
      return state
  }
}
