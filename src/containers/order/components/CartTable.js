import React, { Component } from 'react'
import { Row, Col, Table, Select } from 'antd'
import { LANG } from '../../../locales/'

const Option = Select.Option

const G_CURRENCY = {
  "USD": "$",
  "CNY": "¥",
  "undefined": ''
}

function parsePrice(price) {
  return Math.round(price * 100) / 100
}

function formatPrice(obj) {
  if (obj.amount) {
    if (obj.amount < 0) {
      return '-' + G_CURRENCY[obj.currency] + (0 - obj.amount)
    } else {
      return G_CURRENCY[obj.currency] + obj.amount
    }
  } else {
    return 0
  }
}

function calcTotal(arr) {
  let sum = 0
  arr.forEach((v) => {
    if (v.amount) {
      sum += v.amount
    }
  })
  return {
    currency: arr[0].currency,
    amount: parsePrice(sum)
  }
}

class CartTable extends Component {

  state = {
    coupon: '-1'
  }

  handleChange = (value) => {
    const { fee, handleInputChange } = this.props
    const { coupons } = fee
    this.setState({
      coupon: value
    }, () => {
      if (handleInputChange && coupons.length > 0) {
        if (this.state.coupon !== '-1') {
          handleInputChange('coupon', coupons[this.state.coupon].id)
        }
      }
    })
  }

  getCouponsSelect = () => {
    const { fee } = this.props
    const { coupons } = fee
    const style = {
      padding: '1em 0'
    }
    if (coupons && coupons.length > 0) {
      return (
        <Row>
          <Col span={10} offset={14}>
            <Row style={style}>
              <Col span={14}>
                <h3>{LANG.c_cart_table_select_coupons}</h3>
              </Col>
              <Col span={10}>
                <Select onChange={this.handleChange} style={{ width: 200 }} defaultValue="-1">
                  <Option value="-1">{LANG.c_cart_table_select_coupons_select_none}</Option>
                  {
                    coupons.map((v, key) => {
                      return (<Option key={key} value={key + ''}>{v.info.description}</Option>)
                    })
                  }
                </Select>
              </Col>
            </Row>
          </Col>
        </Row>
      )
    } else {
      return (<div></div>)
    }
  }

  getTotalFee = () => {

    const { data, fee } = this.props
    const { orderExtraFee, coupons } = fee

    let ship = 0
    let tax = 0
    let total = 0
    let coupon = this.state.coupon === '-1' ? 0 : coupons[this.state.coupon].fee
    let items = {
      currency: (data.length > 0 ? data[0].price.currency : 'USD'),
      amount: 0
    }

    data.forEach((v) => {
      items.amount += v.count * v.price.amount
    })

    if (orderExtraFee && orderExtraFee.shippingCost) {
      ship = orderExtraFee.shippingCost
      tax = orderExtraFee.tax
    }

    if (coupon.amount && coupon.amount > 0) {
      coupon.amount = -coupon.amount
    }

    total = calcTotal([ship, tax, items, coupon])

    let taxPrice = formatPrice(tax)
    let shipPrice = formatPrice(ship)
    let totalPrice = formatPrice(total)
    let itemsPrice = formatPrice(items)

    const priceStyle = {
      textAlign: 'right'
    }

    const totalStyle = {
      textAlign: 'right',
      color: 'red'
    }

    const getCouponsNode = () => {
      if (this.state.coupon === '-1') {
        return (<div></div>)
      } else {
        return (
          <Row>
            <Col span={14}><h3>{LANG.c_cart_table_balance_coupons}</h3></Col>
            <Col span={10} style={priceStyle}><span>{formatPrice(coupon)}</span></Col>
          </Row>
        )

      }
    }

    return (
      <Row>
        <Col span={10} offset={14}>

          <Row>
            <Col span={14}><h3>{LANG.c_cart_table_balance_product}</h3></Col>
            <Col span={10} style={priceStyle}><span>{itemsPrice}</span></Col>
          </Row>

          {getCouponsNode()}

          <Row>
            <Col span={14}><h3>{LANG.c_cart_table_balance_tax}</h3></Col>
            <Col span={10} style={priceStyle}><span>{taxPrice}</span></Col>
          </Row>

          <Row>
            <Col span={14}><h3>{LANG.c_cart_table_balance_shipping_cost}</h3></Col>
            <Col span={10} style={priceStyle}><span>{shipPrice}</span></Col>
          </Row>
          <Row>
            <Col span={14}><h3>{LANG.c_cart_table_balance_total}</h3></Col>
            <Col span={10} style={totalStyle}><span>{totalPrice}</span></Col>
          </Row>
        </Col>
      </Row>
    )
  }

  render() {

    const { data } = this.props

    const columns = [
      {
        title: LANG.c_cart_table_column_thumb,
        dataIndex: 'thumb',
        key: 'thumb',
        render: (text, record, index) => {
          return (
            <img style={{
              maxWidth: '50px'
            }} src={record.thumb} alt="" />
          )
        }
      },
      {
        title: LANG.c_cart_table_column_name,
        dataIndex: 'name',
        key: 'name',
        render: (text, record, index) => {
          return record.commodity.info.name
        }
      },
      {
        title: LANG.c_cart_table_column_price,
        dataIndex: 'price',
        key: 'price',
        render: (text, record, index) => {
          const price = formatPrice(record.price)
          return (<p>{price}</p>)
        }
      },
      {
        title: LANG.c_cart_table_column_quantity,
        dataIndex: 'count',
        key: 'count'
      },
      {
        title: LANG.c_cart_table_column_sum,
        dataIndex: 'sum',
        key: 'sum',
        render: (text, record, index) => {
          const total = formatPrice({
            currency: record.price.currency,
            amount: record.price.amount * record.count
          })
          return (<p>{total}</p>)
        }
      }
    ]


    return (
      <div className="section">
        <div className="header">
          <h3>{LANG.c_cart_table_title}</h3>
        </div>
        <Row className="cart" type="flex" align="top">
          <Col span={24}>
            <Table pagination={false}
              columns={columns}
              dataSource={data}
              style={{
                margin: '1em 0'
              }}
            />

            {this.getCouponsSelect()}
            {this.getTotalFee()}
          </Col>
        </Row>
      </div>

    )
  }
}

export default CartTable