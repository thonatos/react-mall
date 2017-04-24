import React, { Component } from 'react'
import { Row, Col, Button, message, Checkbox } from 'antd'

import Contact from './components/Contact'
import ContactAdditional from './components/ContactAdditional'

import Remark from './components/Remark'
import Delivery from './components/Delivery'
import CartTable from './components/CartTable'
import TaxNumber from './components/TaxNumber'
// import RadioContainer from './components/RadioContainer'

import './Confirm.less'
import { LANG } from '../../locales/'
import { ReduxHelper } from '../../helpers/'
import { Base64 } from '../../utils/encode'

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
    individual_tax_number: '',
    items: [],
    agree: false
  }

  componentDidMount() {
    const { email } = this.props.reducer.auth
    const { getAllMeta, listDelivery, getProBatch, resetCartExtraFee } = this.props.actions.order
    this.setState({
      contact_email: email
    }, () => {
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

    if (typeof (callback) === 'function') {
      callback()
    }
  }

  checkUpdate = (nextProps) => {
    const { cart_items_type, cart_items, cart_items_once } = nextProps.reducer.order
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
      router.push('/order/pay/' + Base64.encode(cart_order.id))
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

      default:
        state[type] = values
        break
    }

    this.setState(state, () => {
      console.log(this.state)
    })
  }

  handleSubmit = (e) => {

    const { cart_extra_fee, delivery_info } = this.props.reducer.order
    const { createOrder } = this.props.actions.order
    const { needTaxNumber } = cart_extra_fee

    if (!this.state.delivery) {
      console.log('delivery')
      message.warn(LANG.confirm_message_warning_delivery)
      return
    }

    // if (!this.state.invoice || !this.state.invoice.type) {
    //   console.log('invoice')
    //   return
    // }

    if (needTaxNumber) {
      if (!this.state.individual_tax_number) {
        console.log('individual_tax_number')
        message.warn(LANG.confirm_message_warning_tax_number)
        return
      }
    }

    if (!this.state.pay_type) {
      console.log('pay_type')
      message.warn(LANG.confirm_message_warning_pay_type)
      return
    }

    if (!this.state.contact_email) {
      console.log('contact_email')
      message.warn(LANG.confirm_message_warning_contact_email)
      return
    }

    createOrder(Object.assign({}, this.state, {
      extra: { proOrderBatch: delivery_info.batch }
    }))
  }



  render() {
    const { addDelivery, delDelivery, updateDelivery } = this.props.actions.order
    const { deliveries, delivery_info } = this.props.reducer.order
    const { cart_items_type, cart_items, cart_items_once, cart_extra_fee } = this.props.reducer.order
    const current_items = cart_items_type === 'once' ? cart_items_once : cart_items
    const submitStatus = (current_items.length > 0) && this.state.agree ? '' : 'disabled'

    const { needTaxNumber } = cart_extra_fee

    return (
      <div className="order">
        <div className="breadcrumb">
          <div className="container links">
            <h2>{LANG.confirm_meta_breadcrumb}</h2>
          </div>
        </div>

        <Row className="container detail">

          <Col span={24}>
            <Delivery data={{ deliveries }} {...{ addDelivery, updateDelivery, delDelivery }} handleRadioChange={this.handleChildSubmit}></Delivery>
          </Col>

          <Col span={24}>
            <Contact handleInputChange={this.handleChildSubmit} data={{ defaultEmail: this.state.contact_email }}></Contact>
          </Col>

          <Col span={24}>
            <ContactAdditional handleInputChange={this.handleChildSubmit}></ContactAdditional>
          </Col>

          <Col span={24}>
            <TaxNumber handleInputChange={this.handleChildSubmit} {...{ visible: needTaxNumber }} />
          </Col>
          <Col span={24}>
            <Remark submitType='remark' handleInputChange={this.handleChildSubmit}></Remark>
          </Col>

          <Col span={24}>
            <div className="delivery-info">
              <h3>{LANG.confirm_meta_delivery} </h3>
              <p className="tips">{delivery_info.deliveryTime}, {LANG.confirm_meta_batch} {delivery_info.batch}</p>
            </div>
          </Col>

          <Col span={24}>
            <CartTable data={current_items} fee={cart_extra_fee} handleInputChange={this.handleChildSubmit}></CartTable>
          </Col>

          <Col span={24} className="action-block">

            <div span={24} className="agreement">
              <Checkbox onChange={this.onAgreeChange}>{LANG.confirm_agreement_checkbox_msg}</Checkbox>
              <p className="tips">{LANG.confirm_agreement_policy_msg} <a href="http://support.insta360.com/aftersales?name=mall&default_id=2921" target="_blank">{LANG.confirm_agreement_policy_desc}</a>
              </p>
            </div>

            <Button type="primary" disabled={submitStatus} onClick={this.handleSubmit}>{LANG.confirm_btn_submit}</Button>
          </Col>

        </Row>
      </div>
    )
  }
}

export default ReduxHelper(Confirm)