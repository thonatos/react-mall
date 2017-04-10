import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as orderActions from '../../actions/order'

import React, { Component } from 'react'
import { Link } from 'react-router'
import { Row, Col, Button, message } from 'antd'

import Cart from './components/Cart'
import Contact from './components/Contact'
import Note from './components/Note'
import Delivery from './components/Delivery'
import PayModal from './components/PayModal'
import RadioContainer from './components/RadioContainer'

import './Confirm.less'
import overseaAddr from '../../assets/address/oversea.json'

const language = {
  "ORDER_TITLE_SHIPPING_ADDRESS": "Shipping address",
  "ORDER_TITLE_PAYMENT_METHOD": "Payment method",
  "ORDER_TITLE_SHIPPING_METHOD": "Shipping method",
  "ORDER_TITLE_CONTACT": "Contact",
  "ORDER_TITLE_INVOICE": "Invoice",
  "ORDER_TITLE_NOTE": "Note",
  "ORDER_TITLE_ORDER_SUMMAGE": "Order summary",
  "ORDER_TIPS": "Hitting \"SUBMIT ORDER\" means you agree to the",
  "ORDER_TIPS_POLICY": " Insta360 Store’sales policy  ",
  "ORDER_BTN_SUBMIT": "SUBMIT ORDER",
}

class Confirm extends Component {

  state = {}

  componentDidMount() {
    const { router } = this.props
    const { getAllMeta, restoreCart, listDelivery } = this.props.actions
    const { order } = this.props.reducer
    if (!order.enabled) {
      router.push('/order/list')
    } else {
      restoreCart()
      getAllMeta()
      listDelivery()
    }
  }

  componentWillReceiveProps(nextProps) {
    const { cart } = nextProps.reducer
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
      return
    }
    if (!this.state.invoice || !this.state.invoice.type) {
      console.log('invoice')
      return
    }
    if (!this.state.payType) {
      console.log('payType')
      return
    }
    createOrder(this.state)
  }

  handlePayModalCallback = (action) => {
    const { router } = this.props
    const { updateOrder } = this.props.actions
    updateOrder({
      showPayModal: false,
      order: {
        enabled: false
      }
    })

    switch (action) {
      case 'ok':
        router.push('/order/list')
        break;
      case 'cancel':
        router.push('/order/list')
        break;
      default:
        break;
    }
  }

  render() {
    const { addDelivery, delDelivery, updateDelivery } = this.props.actions
    const {
      order, cart, deliveries,
      showPayModal, submitStatus, pagePayments,
      // invoiceTypes
      payTypes, payChannels, shippingMethods } = this.props.reducer

    return (
      <div className="order">
        <div className="breadcrumb">
          <div className="container links">
            <h2>Confirm Order</h2>
            <div>
              <Link to="/order/list">My Account</Link>            
            </div>
          </div>
        </div>

        <Row className="container detail">
          <PayModal visible={showPayModal} handlePayModalCallback={this.handlePayModalCallback} payChannels={payChannels} order={{ ...order, pagePayments }} ></PayModal>

          <Col span={24}>
            <Delivery title={language.ORDER_TITLE_SHIPPING_ADDRESS} submitType='delivery' data={{ deliveries, overseaAddr }} {...{ addDelivery, updateDelivery, delDelivery }} handleRadioChange={this.handleChildSubmit}></Delivery>
          </Col>

          {/*
            <Col span={14}>
              <RadioContainer title={language.ORDER_TITLE_INVOICE} submitType='invoice' data={invoiceTypes} handleRadioChange={this.handleChildSubmit}></RadioContainer>            
            </Col>          
          */}

          <Col span={14}>
            <RadioContainer title={language.ORDER_TITLE_PAYMENT_METHOD} submitType='payType' data={payTypes} handleRadioChange={this.handleChildSubmit}></RadioContainer>
          </Col>

          <Col span={14}>
            <RadioContainer title={language.ORDER_TITLE_SHIPPING_METHOD} submitType='shippingMethods' data={shippingMethods} handleRadioChange={this.handleChildSubmit}></RadioContainer>
          </Col>

          <Col span={24}>
            <Contact title={language.ORDER_TITLE_CONTACT} submitType='contact' handleInputChange={this.handleChildSubmit}></Contact>
          </Col>

          <Col span={24}>
            <Note title={language.ORDER_TITLE_NOTE} submitType='note' handleInputChange={this.handleChildSubmit}></Note>
          </Col>          

          <Col span={24}>
            <Cart title={language.ORDER_TITLE_ORDER_SUMMAGE} data={cart}></Cart>
          </Col>

          <Col span={24} className="action-block">
            <Button type="primary" disabled={submitStatus} onClick={this.handleSubmit}>{language.ORDER_BTN_SUBMIT}</Button>
            <p className="tips">{language.ORDER_TIPS} <a href="#">{language.ORDER_TIPS_POLICY}</a></p>
          </Col>
        </Row >
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Confirm)