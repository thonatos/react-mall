
cartAdapter = function (cart) {
  return [{
    count: 1,
    name: cart.product.info.name,
    key: cart.product.info.name,
    thumb: cart.product.displays[0].url,
    price: cart.commodity.price
  }]
}

class Filter {
  constructor(props) {
    this.adapter = []
  }

  filt(data) {
    return this.adapter.call({}, data)
  }
}

export default 