export const UPDATE_CART = 'UPDATE_CART'

export function updateCart(product) {
  return (dispatch) => {
    dispatch({
      type: UPDATE_CART,
      data: product
    })
  }
}