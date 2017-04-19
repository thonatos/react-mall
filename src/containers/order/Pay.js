import React, { Component } from 'react'
import { Link } from 'react-router'
import { Row, Col, Button } from 'antd'
import lang from '../../language/'
import { ReduxHelper } from '../../helpers/'
import './Pay.less'
import Paypal from './components/Paypal'

const icons = {
  'credit_card': ['https://static.insta360.cn/assets/mall/ic_visa@2x.png', 'https://static.insta360.cn/assets/mall/ic_mastercard_2@2x.png'],
  'paypal': ['https://static.insta360.cn/assets/mall/PP_logo@2x.png']
}

const icon_order = 'https://static.insta360.cn/assets/mall/ic_order@2x.png'

class Pay extends Component {

  componentDidMount() {
    const { orderId } = this.props.params
    const { getOrderInfo, getAllMeta, updateCartState } = this.props.actions.order

    updateCartState({
      cart_payable: false
    })
    
    getOrderInfo(orderId)
    getAllMeta()
  }

  formatOrderInfo = (orderInfo) => {
    return {
      order_number: (orderInfo.order_number ? orderInfo.order_number : ''),
      currency: (orderInfo.order_number ? orderInfo.payment.currency : ''),
      amount: (orderInfo.order_number ? (orderInfo.payment.amount + orderInfo.payment.shipping_cost + orderInfo.payment.tax - orderInfo.payment.coupon_fee) : '')
    }
  }

  render() {
    const { meta, detailOrder } = this.props.reducer.order
    const { pagePayments, payChannels } = meta
    const { orderId } = this.props.params
    const baseUrl = pagePayments + orderId || ''
    const OrderInfo = this.formatOrderInfo(detailOrder)

    const paypal = (
      <div className="icons">
        {
          icons.paypal.map((v, key) => {
            return <img src={v} alt="" key={key} style={{ width: '184px' }} />
          })
        }
      </div>
    )

    const credit_card = (<div className="icons">
      {
        icons.credit_card.map((v, key) => {
          return <img src={v} alt="" key={key} style={{ width: '112px' }} />
        })
      }
    </div>
    )

    const payNodes = {
      'paypal': paypal,
      'credit_card': credit_card
    }

    return (
      <div className="order-pay">
        <div className="breadcrumb">
          <div className="container links">
            <h2>{lang.pay_meta_breadcrumb}</h2>
          </div>
        </div>
        <Row className="container info">
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
                      <Col span={12} className="channel" key={key}>
                        <Col span={12}>
                          {payNodes[obj.key]}
                          {
                            obj.key === 'paypal' ? (
                              <Paypal id={'paypal'} orderId={orderId} />
                            ) : (
                                <a href={baseUrl + '&channel=' + obj.key} key={key} className="btn-channel" target="_blank">
                                  <Button className="btn-channel-button">{lang.pay_actions_btn_pay_now}</Button>
                                </a>
                              )
                          }
                        </Col>
                      </Col>
                    )
                  }
                  )
                }
              </Row>
            </div>
          </Col>

          <Col span={24}>
            <div className="pay-suggestion">
            <h2 className="title">{lang.pay_suggestion_title}</h2>
            <p>{lang.pay_suggestion_desc}</p>
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