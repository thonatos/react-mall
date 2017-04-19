import React, { Component } from 'react'
import { Link } from 'react-router'
import { Row, Col, Button, message, Checkbox } from 'antd'

import Contact from './components/Contact'
import ContactAdditional from './components/ContactAdditional'

import Remark from './components/Remark'
import Delivery from './components/Delivery'
import CartTable from './components/CartTable'
// import RadioContainer from './components/RadioContainer'

import './Confirm.less'
import lang from '../../language/'
import { ReduxHelper } from '../../helpers/'
import overseaAddr from '../../assets/address/oversea.json'

message.config({
  top: 100,
  duration: 2.5
})

class Confirm extends Component {

  state = {
    invoice: {
      type: 'none'
    },
    pay_type: 'online',
    contact_email: '',
    subscribe: true,
    country: '',
    items: [],
    flag_price_updated: false,
    agree: false
  }

  componentDidMount() {
    const { email } = this.props.reducer.auth
    const { getAllMeta, listDelivery, getProBatch, resetCartExtraFee } = this.props.actions.order
    this.setState({
      contact_email: email,
      flag_price_updated: false
    }, () => {
      console.log('init', this.state)
      resetCartExtraFee()
      listDelivery()
      getAllMeta()
      getProBatch()
    })
  }

  updatePriceAndExtraFee = (country, callback) => {
    const { cart_items_type } = this.props.reducer.order
    const { getCartPrice, countOrderExtraFee } = this.props.actions.order
    const cart_items = this.state.items

    if (cart_items.length < 1) {
      return
    }

    let commodities = cart_items.map((v, k) => {
      return v.id
    })

    getCartPrice({
      country: country,
      commodities: commodities
    }, cart_items_type)

    countOrderExtraFee({
      items: cart_items,
      country: country
    })

    if(typeof(callback) === 'function'){
      callback()
    }
  }

  checkUpdate = (nextProps) =>{
    const { cart_items_type, cart_items, cart_items_once } = nextProps.reducer.order
    const { deliveries } = nextProps.reducer.order
    const items = cart_items_type === 'once' ? cart_items_once : cart_items

    if (items.length > 0) {
      let new_items = items.map((v, k) => {
        return {
          id: v._commodityId,
          number: v.count
        }
      })
      this.setState({ items: new_items })
    }  

    if (!this.state.flag_price_updated && deliveries.length > 0) {      
      this.setState({        
        country: deliveries[0].country,
        delivery: deliveries[0].id
      }, () => {
        console.log(this.state)
        this.updatePriceAndExtraFee(deliveries[0].country, ()=>{
          this.setState({
            flag_price_updated: true
          })
        })
      })
    }

  }  

  componentWillReceiveProps(nextProps) {
    const { router } = nextProps
    const { cart_items_type, cart_payable, cart_order } = nextProps.reducer.order
    const { resetCartItems, resetCartItemsOnce } = nextProps.actions.order
    
    this.checkUpdate(nextProps)

    if (cart_payable) {
      if (cart_items_type === 'once') {
        resetCartItemsOnce()
      } else {
        resetCartItems()
      }

      router.push('/order/pay/' + cart_order.id)
      return
    }

  }

  onAgreeChange = (e) => {
    this.setState({
      agree: e.target.checked
    })
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
        break

      case 'delivery':
        let country = values.country
        this.updatePriceAndExtraFee(country)

        state[type] = values.id
        state['country'] = country
        break

      case 'remark':
        state[type] = values
        break

      case 'backup_email':
        state[type] = values
        break

      case 'subscribe':
        state[type] = values
        break

      case 'contact_email':
        state[type] = values
        break

      case 'backup_phone':
        state[type] = values
        break

      case 'coupon':
        state[type] = values
        break

      default:
        state[type] = values.key
        break
    }

    this.setState(state, () => {
      console.log(this.state)
    })
  }

  handleSubmit = (e) => {
    const { createOrder } = this.props.actions.order

    if (!this.state.delivery) {
      console.log('delivery')
      message.warn(lang.confirm_message_warning_delivery)
      return
    }

    // if (!this.state.invoice || !this.state.invoice.type) {
    //   console.log('invoice')
    //   return
    // }

    if (!this.state.pay_type) {
      console.log('pay_type')
      message.warn(lang.confirm_message_warning_pay_type)
      return
    }

    if (!this.state.contact_email) {
      console.log('contact_email')
      message.warn(lang.confirm_message_warning_contact_email)
      return
    }

    createOrder(this.state)
  }



  render() {
    const { addDelivery, delDelivery, updateDelivery } = this.props.actions.order
    const { deliveries, delivery_info } = this.props.reducer.order

    // const { payTypes } = this.props.reducer.meta
    // const { showPayModal, submitStatus,cart_items,  payOrder, cart, deliveries } = this.props.reducer
    // payTypes, invoiceTypes, shippingMethods, payChannels

    const { cart_items_type, cart_items, cart_items_once, cart_extra_fee } = this.props.reducer.order
    const current_items = cart_items_type === 'once' ? cart_items_once : cart_items
    const submitStatus = (current_items.length > 0) && this.state.agree ? '' : 'disabled'

    return (
      <div className="order">
        <div className="breadcrumb">
          <div className="container links">
            <h2>{lang.confirm_meta_breadcrumb}</h2>
            <div>
              <Link to="/order/list">{lang.breadcrumb_my_orders}</Link>
            </div>
          </div>
        </div>

        <Row className="container detail">

          <Col span={24}>
            <Delivery data={{ deliveries, overseaAddr }} {...{ addDelivery, updateDelivery, delDelivery }} handleRadioChange={this.handleChildSubmit}></Delivery>
          </Col>

          <Col span={24}>
            <Contact handleInputChange={this.handleChildSubmit} data={{ defaultEmail: this.state.contact_email }}></Contact>
          </Col>


          <Col span={24}>
            <ContactAdditional handleInputChange={this.handleChildSubmit}></ContactAdditional>
          </Col>

          <Col span={24}>
            <Remark submitType='remark' handleInputChange={this.handleChildSubmit}></Remark>
          </Col>

          <Col span={24}>
            <CartTable data={current_items} fee={cart_extra_fee} handleInputChange={this.handleChildSubmit}></CartTable>
          </Col>

          <Col span={24}>
            <div className="delivery-info">
              <p className="tips">{lang.confirm_meta_delivery} {delivery_info.deliveryTime}, {lang.confirm_meta_batch} {delivery_info.batch}</p>
            </div>
          </Col>

          <Col span={24} className="action-block">

            <div span={24} className="agreement">
              <Checkbox onChange={this.onAgreeChange}>{lang.confirm_agreement_checkbox_msg}</Checkbox>
              <p className="tips">{lang.confirm_agreement_policy_msg}<a href="/page/privacy" target="_blank">{lang.confirm_agreement_policy_desc}</a>
              </p>
            </div>

            <Button type="primary" disabled={submitStatus} onClick={this.handleSubmit}>{lang.confirm_btn_submit}</Button>
            {/*
              <p className="tips">{lang.confirm_tips}<a href="/page/privacy" target="_blank">{lang.confirm_tips_policy}</a></p>
            */}
          </Col>

          {/*
            <PayModal visible={showPayModal} handlePayModalCallback={this.handlePayModalCallback} payChannels={payChannels} order={{ ...payOrder, pagePayments }} ></PayModal>  
          */}

          {/*
            <Col span={14}>
              <RadioContainer title={lang.confirm_title_invoice} submitType='invoice' data={invoiceTypes} handleRadioChange={this.handleChildSubmit}></RadioContainer>            
            </Col>          
          */}

          {/*
          <Col span={14}>
            <RadioContainer title={lang.confirm_title_payment_method} submitType='payType' data={payTypes} handleRadioChange={this.handleChildSubmit}></RadioContainer>
          </Col>          
          */}

          {/*
            <Col span={14}>
            <RadioContainer title={lang.confirm_title_shipping_method} submitType='shippingMethods' data={shippingMethods} handleRadioChange={this.handleChildSubmit}></RadioContainer>
          </Col>            
        */}

        </Row>
      </div>
    )
  }
}

export default ReduxHelper(Confirm)