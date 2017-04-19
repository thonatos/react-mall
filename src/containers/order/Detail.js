import moment from 'moment'
import React, { Component } from 'react'
import { Row, Col, Table, Modal, Button } from 'antd'

import lang from '../../language/'
import './Detail.less'
import { ReduxHelper } from '../../helpers/'
import { Base64 } from '../../utils/encode'

const icon_order = 'https://static.insta360.cn/assets/mall/ic_order@2x.png'

const ENUM_STATE = {
  '0': lang.order_state_0,
  '1': lang.order_state_1,
  '2': lang.order_state_2,
  '3': lang.order_state_3,
  '8': lang.order_state_8,
  '9': lang.order_state_9,
  '-1': lang.order_state_x1,
  '-2': lang.order_state_x2
}

function parsePrice(price) {
  return Math.round(price * 100) / 100
}

function info() {
  Modal.info({
    title: lang.detail_delivery_modal_change_title,
    content: (
      <div>
        <p>{lang.detail_delivery_modal_change_msg}</p>
      </div>
    ),
    okText: lang.detail_delivery_modal_ok_text,
    onOk() { },
  })
}

class Detail extends Component {

  componentDidMount() {
    const orderId = Base64.decode(this.props.params.orderId)
    const { getOrderInfo } = this.props.actions.order
    getOrderInfo(orderId)
  }

  getTotalFee = () => {

    const { detailOrder } = this.props.reducer.order

    const amount = detailOrder.payment.amount
    const coupon = detailOrder.payment.coupon_fee
    const ship = detailOrder.payment.shipping_cost
    const tax = detailOrder.payment.tax
    const total = parsePrice(amount + ship + tax - coupon)

    const priceStyle = {
      textAlign: 'right'
    }

    const totalStyle = {
      textAlign: 'right',
      color: 'red'
    }

    return (
      <Row className="">
        <Col span={10} offset={14}>

          <Row>
            <Col span={14}><h3>{lang.c_cart_table_balance_product}</h3></Col>
            <Col span={10} style={priceStyle}><span>{amount}</span></Col>
          </Row>

          <Row>
            <Col span={14}><h3>{lang.c_cart_table_balance_coupons}</h3></Col>
            <Col span={10} style={priceStyle}><span>{0 - coupon}</span></Col>
          </Row>

          <Row>
            <Col span={14}><h3>{lang.c_cart_table_balance_tax}</h3></Col>
            <Col span={10} style={priceStyle}><span>{tax}</span></Col>
          </Row>

          <Row>
            <Col span={14}><h3>{lang.c_cart_table_balance_shipping_cost}</h3></Col>
            <Col span={10} style={priceStyle}><span>{ship}</span></Col>
          </Row>

          <Row>
            <Col span={14}><h3>{lang.c_cart_table_balance_total}</h3></Col>
            <Col span={10} style={totalStyle}><span>{total}</span></Col>
          </Row>

        </Col>

      </Row>
    )
  }


  getDeliveryTable = () => {

    const { detailOrder } = this.props.reducer.order
    const { delivery } = detailOrder

    const deliveryObject = {
      'name': delivery.last_name + ' ' + delivery.first_name,
      'address': `${delivery.country}, ${delivery.province}, ${delivery.city}, ${delivery.address}, ${delivery.sub_address}`,
      'phone': `${delivery.phone_code}-${delivery.phone}`,
      'zip': delivery.zip_code
    }

    let dataSource = []

    for (var key in deliveryObject) {
      if (deliveryObject.hasOwnProperty(key)) {
        dataSource.push({
          key: key,
          name: key,
          value: deliveryObject[key]
        })
      }
    }

    const columns = [{
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
    }]

    return (
      <Table dataSource={dataSource} columns={columns} pagination={false} showHeader={false} />
    )
  }

  getCartTable = (data) => {
    const columns = [
      {
        title: lang.c_cart_table_column_thumb,
        dataIndex: 'thumb',
        key: 'thumb',
        render: (text, record, index) => {
          return (
            <img style={{
              maxWidth: '50px'
            }} src={record.product_displays[0].preview} alt="" />
          )
        }
      },
      {
        title: lang.c_cart_table_column_name,
        dataIndex: 'commodity_name',
        key: 'name'
      },
      {
        title: lang.c_cart_table_column_price,
        dataIndex: 'price',
        key: 'price'
      },
      {
        title: lang.c_cart_table_column_quantity,
        dataIndex: 'number',
        key: 'number'
      },
      {
        title: lang.c_cart_table_column_sum,
        dataIndex: 'sum',
        key: 'sum',
        render: (text, record, index) => {
          const amount = record.price
          const count = record.number
          return (<p>{amount * count} </p>)
        }
      }
    ]

    return (<Table pagination={false}
      rowKey="id"
      columns={columns}
      dataSource={data}
    />)
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
      amount: total,
      expired: (orderInfo.order_number ? (moment.unix(orderInfo.create_time / 1000).add(30, 'm').unix() - moment().format('X')) : -1)
    }
  }

  render() {
    const { detailOrder } = this.props.reducer.order

    if (!detailOrder.order_number) {
      return (<div></div>)
    }

    const cartTable = this.getCartTable(detailOrder.items)
    const OrderInfo = this.formatOrderInfo(detailOrder)

    return (
      <div className="order-detail">
        <div className="breadcrumb">
          <div className="container links">
            <h2>{lang.detail_meta_breadcrumb}</h2>
          </div>
        </div>
        <Row className="container info">
          <Col span={24}>
            <div className="summary">
              <div className="icon">
                <img src={icon_order} alt="" />
              </div>
              <div className="order-box">
                <h2 className="title">{lang.detail_summary_title}</h2>
                <div className="box">
                  <div className="num">
                    <h4>{lang.pay_detail_summary_order_number}</h4>
                    <p>{detailOrder.order_number}</p>
                    <h4>{lang.detail_summary_contact_email}</h4>
                    <p>{detailOrder.contact_email}</p>
                  </div>
                  <div className="amount">
                    <h4>{lang.pay_detail_summary_pay_state}</h4>
                    <p>{ENUM_STATE[detailOrder.state]}</p>
                    <h4>{lang.pay_detail_summary_pay_amount}</h4>
                    <p className="price">{OrderInfo.currency} {OrderInfo.amount}</p>
                  </div>
                </div>
              </div>
              <div className="notify">
                {
                  OrderInfo.expired > 0 ? (
                    <div>
                      <h2 className="title">{lang.pay_suggestion_title}</h2>
                      <p>{lang.pay_suggestion_desc}</p>
                    </div>
                  ) : null
                }
              </div>
            </div>
          </Col>

          <Col span={24}>
            <div className="delivery">
              <h2 className="title">{lang.detail_delivery_title}</h2>
              <Button className="btn-delivery-change" onClick={info}>{lang.detail_delivery_btn_change}</Button>
              <div>
                {this.getDeliveryTable()}
              </div>
            </div>
          </Col>

          <Col span={24}>
            <div className="items">
              <h2 className="title">{lang.c_cart_table_column_name}</h2>
              {cartTable}
              <div style={{ padding: '2em 0' }}>
                {this.getTotalFee()}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default ReduxHelper(Detail)