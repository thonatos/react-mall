import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as orderActions from '../actions/order'
import * as authActions from '../actions/auth'

import React, { Component } from 'react'
import { Button, Card, InputNumber } from 'antd'
import lang from '../language/'
import './Cart.less'

const ic_cart = 'https://static.insta360.cn/assets/mall/ic_cart@2x.png'
const ic_cart_closed = 'https://static.insta360.cn/assets/mall/ic_cart_closed@2x.png'

class Cart extends Component {

  state = {
    open: false,
    show: true
  }

  toogle = (event) => {
    event.preventDefault()
    this.setState({
      open: !this.state.open
    })
  }

  plus = (item, event) => {
    event.preventDefault()
    const { plusCartItem } = this.props.actions.order
    plusCartItem(item)
  }

  minus = (item, event) => {
    event.preventDefault()
    const { minusCartItem } = this.props.actions.order
    minusCartItem(item)
  }

  change(item, value) {
    const { changeCartItem } = this.props.actions.order
    changeCartItem(Object.assign({}, item, {
      count: value
    }))
  }

  remove = (item, event) => {
    event.preventDefault()
    const { removeFromCart } = this.props.actions.order
    removeFromCart(item)
  }

  checkout = (event) => {
    const { router } = this.props
    const { auth } = this.props.reducer
    const { updateCartItemsType } = this.props.actions.order
    const { setRedirect } = this.props.actions.auth
    const { updateAuthAction } = this.props.actions.auth

    updateCartItemsType('items')

    if (!auth.isLoggedIn) {
      setRedirect('/order/confirm')
      updateAuthAction('login')
    } else {
      router.push('/order/confirm')
    }
  }

  render() {
    const { cart_items } = this.props.reducer.order
    const showFixButton = this.props.showCart

    const showCart = this.state.open & showFixButton ? {
      display: 'block',
      opacity: '1'
    } : {
        display: 'none',
        opacity: '0'
      }

    const items_number = cart_items.length
    let items_total = 0
    let items_currency = cart_items.length > 0 ? cart_items[0].price.currency : ''

    cart_items.forEach(function (element) {
      items_total += element.price.amount * element.count
    })

    return (
      <div>

        <Card style={showCart} className="c-card">

          <ul className="c-list">
            {
              cart_items.map((item, key) => {
                return (
                  <li key={key}>
                    <div className="c-ul-li-box" >
                      <div className="b-thumb">
                        <img src={item.thumb} alt="" />
                      </div>
                      <div className="b-name">
                        {item.commodity.info.name}
                      </div>
                      <div className="b-count">
                        <InputNumber min={1} value={item.count} onChange={this.change.bind(this, item)} style={{
                          width: '50px'
                        }} />
                      </div>
                      <div className="b-action">
                        <a href="#" className="c-close" onClick={this.remove.bind(this, item)}>
                          <img src={ic_cart_closed} alt="" />
                        </a>
                      </div>
                    </div>
                  </li>
                )
              })
            }
          </ul>

          <div className="c-footer">
            <div className="c-calc">
              <span className="c-f-count">{items_number} {lang.cart_calc_items} </span>
              <span className="c-f-total">{items_currency} {items_total}</span>
            </div>
            <Button className="btn-checkout" onClick={this.checkout.bind(this)}>{lang.cart_calc_checkout}</Button>
          </div>
        </Card>

        <div style={{
          display: showFixButton ? 'block' : 'none'
        }} className="btn-cart-fixed" onClick={this.toogle.bind(this)}>
          <img src={ic_cart} alt="" />
          <span>({items_number})</span>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    reducer: {
      auth: state.auth,
      order: state.order
    }
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      order: bindActionCreators(orderActions, dispatch),
      auth: bindActionCreators(authActions, dispatch)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)