import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import pingpp from 'pingpp-js'

import * as orderActions from '../../actions/order'
import * as shareActions from '../../actions/share'

import React, { Component } from 'react'
import { Row, Col, Button, message } from 'antd'

import Distribution from './components/Distribution'
import Invoice from './components/Invoice'
import Payment from './components/Payment'
import Logistics from './components/Logistics'
import Contact from './components/Contact'
import Cart from './components/Cart'
// import Pay from './components/Pay'

import './Info.less'

import { user } from '../data'

class Info extends Component {

  constructor(props) {
    super(props)
    this.state = {
      submitStatus: 'disabled',
      payStatus: 'disabled',
      payEnabled: false,
      delivery: 1
    }
  }

  componentDidMount() {
    const { share, listInvoice, listPayment } = this.props
    listInvoice()
    listPayment()

    // init
    if (!share.cart) {
      message.warn('你当前购物车为空.')
    } else {
      this.setState({
        items: [
          {
            id: share.cart.commodity.id,
            number: 1
          }
        ],
        submitStatus: false
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    const { order } = nextProps
    console.log(order)

    if (order.order && Object.keys(order.order).length > 0) {
      this.setState({
        payStatus: false
      })
    }

    if (order.payData && Object.keys(order.payData).length > 0) {
      pingpp.createPayment(order.payData, function (result, err) {
        console.log(result, err)
        if (result === "success") {
          // 只有微信公众账号 wx_pub 支付成功的结果会在这里返回，其他的支付结果都会跳转到 extra 中对应的 URL。
        } else if (result === "fail") {
          // charge 不正确或者微信公众账号支付失败时会在此处返回
        } else if (result === "cancel") {
          // 微信公众账号支付取消支付
        }
      })
    }
  }

  handleDistribution = (v) => {
    console.log('#handleDistribution', v)
    // this.setState()
  }

  handleInvoice = (inv) => {
    console.log('#handleInvoice', inv)
    this.setState({
      invoice: {
        type: inv.key,
        title: '###' // 发票抬头
      }
    })
  }

  handlePayment = (v) => {
    console.log('#handlePayment', v)
  }

  handleSubmit = (e) => {

    const { createOrder } = this.props

    if (this.state.items.length < 1) {
      console.log('items')
      return false
    }

    if (!this.state.delivery) {
      console.log('delivery')
      return false
    }

    if (!this.state.invoice || !this.state.invoice.type) {
      console.log('invoice')
      return false
    }

    createOrder(this.state)
  }

  handlePay = (e) => {
    const { order, payOrder } = this.props
    payOrder({
      id: order.order.id,
      channel: 'weixin'
    })
  }

  render() {
    // console.log(this.props)
    const { share, order } = this.props

    let cart = (<div></div>)

    if (share.cart) {
      let _cart = [{
        count: 1,
        name: share.cart.product.info.name,
        key: share.cart.product.info.name,
        thumb: share.cart.product.displays[0].url,
        price: share.cart.commodity.price
      }]
      cart = (<Cart data={_cart}></Cart>)
    }

    let invoice = (<div></div>)
    if (order.invoiceTypes) {
      invoice = (<Invoice data={order.invoiceTypes} handleInvoice={this.handleInvoice}></Invoice>)
    }

    let payment = (<div></div>)
    if (order.payTypes) {
      payment = (<Payment data={order.payTypes} handlePayment={this.handlePayment}></Payment>)
    }

    // let pay = (<div></div>)
    // if(order.order){
    //   pay = (<Pay show={this.state.showPay} data={order.order}></Pay>)
    // }

    return (
      <Row className="container order">

        <Col span={24}>
          <Distribution data={{
            order: order,
            user: user
          }} handleResult={this.handleDistribution}></Distribution>
        </Col>

        <Col span={24}>
          <h3>发票信息</h3>
          {invoice}
        </Col>

        <Col span={24}>
          <h3>支付方式</h3>
          {payment}
        </Col>

        <Col span={24}>
          <h3>物流方式</h3>
          <Logistics></Logistics>
        </Col>

        <Col span={24}>
          <h3>联系邮箱</h3>
          <Contact></Contact>
        </Col>

        <Col span={24}>
          <h3>订单概览</h3>
          {cart}
        </Col>

        <Col span={24} className="action-block">
          <Button type="primary" disabled={this.state.payStatus} onClick={this.handlePay}>支付订单</Button>
          <Button type="primary" disabled={this.state.submitStatus} onClick={this.handleSubmit}>提交订单</Button>
          <p className="tips">点击提交订单表示您同意 <a href="#">Insta360 商城的销售政策</a></p>
        </Col>

      </Row>
    )
  }
}

function mapStateToProps(state) {
  return {
    share: state.share,
    order: state.order
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, orderActions, shareActions), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Info)