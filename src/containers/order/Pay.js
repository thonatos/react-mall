import React, { Component } from 'react'
import { Link } from 'react-router'
import { Row, Col, Button } from 'antd'
import { ReduxHelper } from '../../helpers/'
import { Base64 } from '../../utils/encode'
import lang from '../../language/'
import Paypal from './components/Paypal'
import './Pay.less'

// const icons = {
//   'credit_card': ['https://static.insta360.cn/assets/mall/ic_visa@2x.png', 'https://static.insta360.cn/assets/mall/ic_mastercard_2@2x.png'],
//   'paypal': ['https://static.insta360.cn/assets/mall/PP_logo@2x.png']
// }

const channels = {
  'paypal': {
    thumb: 'https://static.insta360.cn/assets/mall/PP_logo@2x.png'
  },
  'credit_card': {
    thumb: 'https://static.insta360.cn/assets/mall/ic_mastercard_2@2x.png'
  },
  'alipay': {
    thumb: 'https://static.insta360.cn/assets/mall/ic_visa@2x.png'
  }
}

const icon_order = 'https://static.insta360.cn/assets/mall/ic_order@2x.png'

class Pay extends Component {

  componentDidMount() {
    const orderId = Base64.decode(this.props.params.orderId)
    const { getOrderInfo, getAllMeta, updateCartState } = this.props.actions.order
    updateCartState({
      cart_payable: false
    })

    getOrderInfo(orderId)
    getAllMeta()
  }


  getChannelNode = (channel) => {
    const { meta } = this.props.reducer.order
    const { pagePayments } = meta
    const orderId = Base64.decode(this.props.params.orderId)
    const baseUrl = pagePayments + orderId || ''

    console.log(channel)

    switch (channel.key) {
      case 'credit_card':
        return (
          <div>
            <img src={channels[channel.key].thumb} alt='' />
            <a href={baseUrl + '&channel=' + channel.key} className="btn-channel" target="_blank">
              <Button className="btn-channel-button">{lang.pay_actions_btn_pay_now}</Button>
            </a>
          </div>
        )

      case 'alipay':
        return (
          <div>
            <img src={channels[channel.key].thumb} alt='' />
            <a href={baseUrl + '&channel=' + channel.key} className="btn-channel" target="_blank">
              <Button className="btn-channel-button">{lang.pay_actions_btn_pay_now}</Button>
            </a>
          </div>
        )

      case 'paypal':
        return (
          <div>
            <img src={channels[channel.key].thumb} alt='' />
            <Paypal id={'paypal'} orderId={orderId} />
            <p className="channel-desc">
              {lang.pay_channel_paypal_description}
            </p>
          </div>
        )

      default:
        return null
    }
  }

  formatOrderInfo = (orderInfo) => {

    function parsePrice(price) {
      return Math.round(price * 100) / 100
    }

    const totalRound = orderInfo.order_number ? (orderInfo.payment.amount + orderInfo.payment.shipping_cost + orderInfo.payment.tax - orderInfo.payment.coupon_fee) : false
    const total = totalRound ? parsePrice(totalRound) : ''

    return {
      order_number: (orderInfo.order_number ? orderInfo.order_number : ''),
      currency: (orderInfo.order_number ? orderInfo.payment.currency : ''),
      amount: total
    }
  }

  render() {
    const { meta, detailOrder } = this.props.reducer.order
    const { payChannels } = meta
    const OrderInfo = this.formatOrderInfo(detailOrder)

    return (
      <div className="order-pay">
        <div className="breadcrumb">
          <div className="container links">
            <h2>{lang.pay_meta_breadcrumb}</h2>
          </div>
        </div>

        <Row className="container info">

          <Col span={24}>
            <div className="pay-suggestion">
              <h2 className="title">{lang.pay_suggestion_title}</h2>
              <p>{lang.pay_suggestion_desc}</p>
            </div>
          </Col>

          <Col span={24}>
            <div className="detail">
              <div className="icon">
                <img src={icon_order} alt="" />
              </div>
              <div className="summary">
                <h2 className="title">{lang.pay_detail_summary_title}</h2>

                <div className="box">
                  <div className="num">
                    <h4>{lang.pay_detail_summary_order_number}</h4>
                    <p className="number">{OrderInfo.order_number}</p>
                  </div>
                  <div className="amount">
                    <h4>{lang.pay_detail_summary_pay_amount}</h4>
                    <p className="price">{OrderInfo.currency} {OrderInfo.amount}</p>
                  </div>
                </div>
              </div>
            </div>
          </Col>

          <Col span={24}>
            <div className="pay-channels">
              <h2 className="title">{lang.pay_channels_title}</h2>
              <Row className="channels">
                {
                  payChannels.map((obj, key) => {
                    return (
                      <Col span={8} className="channel" key={key}>
                        {this.getChannelNode(obj)}
                      </Col>
                    )
                  })
                }
              </Row>
            </div>
          </Col>

          <Col span={6} offset={18}>
            <div className="actions">
              <Link to={'/order/list'}><Button type="primary" className="btn-actions">{lang.pay_actions_btn_pay_later}</Button></Link>
              <Link to={'/order/list'}><Button type="primary" className="btn-actions">{lang.pay_actions_btn_done}</Button></Link>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default ReduxHelper(Pay)