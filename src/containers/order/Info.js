import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as orderActions from '../../actions/order'

import React, { Component } from 'react'
import { Row, Col, Button, message } from 'antd'

import Cart from './components/Cart'
import Contact from './components/Contact'
import Delivery from './components/Delivery'
import PayModal from './components/PayModal'
import RadioContainer from './components/RadioContainer'

import './Info.less'
import overseaAddr from '../../assets/address/china.json'

class Info extends Component {

  componentDidMount() {
    const { getAllMeta, listDelivery } = this.props.actions
    const { cart } = this.props.reducer

    getAllMeta()
    listDelivery()

    if (cart.length < 1) {
      message.warn('你当前购物车为空.')
    } else {
      this.setState({
        items: [
          {
            id: cart[0]._commodityId,
            number: cart[0].count
          }
        ]
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
      case 'delivery':
        state[type] = values
        break;
      default:
        state[type] = values.key
        break;
    }

    this.setState(state, () => {
      // console.log(this.state)
    })
  }

  handleSubmit = (e) => {
    const { createOrder } = this.props.actions
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

  render() {
    const { router } = this.props
    const { addDelivery, delDelivery, updateDelivery } = this.props.actions
    const {
      order, cart, deliveries,
      showPayModal, submitStatus, pagePayments,
      payTypes, payChannels, invoiceTypes, shippingMethods } = this.props.reducer

    return (
      <Row className="container order">

        <PayModal visible={showPayModal} router={router} payChannels={payChannels} order={{...order, pagePayments}} ></PayModal>

      <Col span={24}>
        <Delivery submitType='delivery' data={{ deliveries, overseaAddr }} {...{ addDelivery, updateDelivery, delDelivery }} handleRadioChange={this.handleChildSubmit}></Delivery>
      </Col>

      <Col span={14}>
        <RadioContainer title='发票信息' submitType='invoice' data={invoiceTypes} handleRadioChange={this.handleChildSubmit}></RadioContainer>
        <div>发票抬头</div>
      </Col>

      <Col span={14}>
        <RadioContainer title='支付方式' submitType='payType' data={payTypes} handleRadioChange={this.handleChildSubmit}></RadioContainer>
      </Col>

      <Col span={14}>
        <RadioContainer title='物流方式' submitType='shippingMethods' data={shippingMethods} handleRadioChange={this.handleChildSubmit}></RadioContainer>
      </Col>

      <Col span={24}>
        <Contact submitType='contact' handleInputChange={this.handleChildSubmit}></Contact>
      </Col>

      <Col span={24}>
        <Cart data={cart}></Cart>
      </Col>

      <Col span={24} className="action-block">
        <Button type="primary" disabled={submitStatus} onClick={this.handleSubmit}>提交订单</Button>
        <p className="tips">点击提交订单表示您同意 <a href="#">Insta360 商城的销售政策</a></p>
      </Col>

      </Row >
    )
  }
}

function mapStateToProps(state) {
  return {
    reducer: state.order
  }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(orderActions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Info)