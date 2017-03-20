import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import pingpp from 'pingpp-js'

import * as orderActions from '../../actions/order'
import * as shareActions from '../../actions/share'

import React, { Component } from 'react'
import { Row, Col, Button, message } from 'antd'

import Cart from './components/Cart'
import Contact from './components/Contact'
import Delivery from './components/Delivery'
import RadioContainer from './components/RadioContainer'

import './Info.less'

import { user } from '../data'

class Info extends Component {

  state = {
    submitStatus: 'disabled',
    payStatus: 'disabled',
    payEnabled: false,
    delivery: 1
  }

  componentDidMount() {
    const { share, getAllMeta } = this.props
    getAllMeta()

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
      console.log(order.payData)
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

  handleChildSubmit = (type, values) => {    
    console.log(type, values)
    let state = {}
    switch (type) {
      case 'invoice':
        state[type] = {
          type: values.key,
          title: values.title || 'none'
        }
        break;
      case 'contact':        
        state[type] = values
        break;
      default:
        state[type] = values.key
        break;
    }

    this.setState(state, ()=>{
      console.log(this.state)
    })
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
    if (!this.state.payType) {
      console.log('payType')
      return false
    }
    createOrder(this.state)
  }

  handlePay = (e) => {
    const { order, payOrder } = this.props
    payOrder({
      id: order.order.id,
      channel: 'alipay'
    })
  }

  render() {
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

    return (
      <Row className="container order">

        <Col span={24}>
          <Delivery data={{
            order: order,
            user: user
          }} handleResult={this.handleDistribution}></Delivery>
        </Col>

        <Col span={14}>
          <RadioContainer title='发票信息' submitType='invoice' data={order.invoiceTypes} handleRadioChange={this.handleChildSubmit}></RadioContainer>
          <div>发票抬头</div>
        </Col>

        <Col span={14}>
          <RadioContainer title='支付方式' submitType='payType' data={order.payTypes} handleRadioChange={this.handleChildSubmit}></RadioContainer>
        </Col>

        <Col span={14}>
          <RadioContainer title='物流方式' submitType='shippingMethods' data={order.shippingMethods} handleRadioChange={this.handleChildSubmit}></RadioContainer>
        </Col>

        <Col span={24}>
          <Contact submitType='contact' handleInputChange={this.handleChildSubmit}></Contact>
        </Col>

        <Col span={24}>
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