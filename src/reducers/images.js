import { IMAGES_FETCH_SUCCESS } from '../actions/images'

const initialState = []

export default function reducer(state = initialState, action = {}) {
  const { data } = action  
  switch (action.type) {
    case IMAGES_FETCH_SUCCESS:
      return [...data.data.images]
    default:
      return state
  }
}
