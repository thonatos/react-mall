import React, { Component } from 'react'
import { Row, Col, Table, Select } from 'antd'
import lang from '../../../language/'

const Option = Select.Option

function parsePrice (price){
  return Math.round(price * 100) / 100
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
        handleInputChange('coupon', coupons[this.state.coupon].id)
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
                <h3>{lang.c_cart_table_select_coupons}</h3>
              </Col>
              <Col span={10}>
                <Select onChange={this.handleChange} style={{ width: 200 }} defaultValue="-1">
                  <Option value="-1">none</Option>
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

    let items_sum = 0
    data.forEach((v) => {
      items_sum += v.count * v.price.amount
    })

    const coupon = this.state.coupon === '-1' ? 0 : coupons[this.state.coupon].fee.amount
    const ship = (orderExtraFee && orderExtraFee.shippingCost.amount) || 0
    const tax = (orderExtraFee && orderExtraFee.tax.amount) || 0
    const total = parsePrice(items_sum + ship + tax - coupon)    
    
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
            <Col span={14}><h3>{lang.c_cart_table_balance_coupons}</h3></Col>
            <Col span={10} style={priceStyle}><span>{0 - coupon}</span></Col>
          </Row>
        )

      }
    }

    return (
      <Row>
        <Col span={10} offset={14}>

          <Row>
            <Col span={14}><h3>{lang.c_cart_table_balance_product}</h3></Col>
            <Col span={10} style={priceStyle}><span>{items_sum}</span></Col>
          </Row>

          {getCouponsNode()}

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

  render() {

    const { data } = this.props

    const columns = [
      {
        title: lang.c_cart_table_column_thumb,
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
        title: lang.c_cart_table_column_name,
        dataIndex: 'name',
        key: 'name',
        render: (text, record, index) => {
          return record.commodity.info.name
        }        
      },
      {
        title: lang.c_cart_table_column_price,
        dataIndex: 'price',
        key: 'price',
        render: (text, record, index) => {
          return (<p>{record.price.amount}</p>)
        }
      },
      {
        title: lang.c_cart_table_column_quantity,
        dataIndex: 'count',
        key: 'count'
      },
      {
        title: lang.c_cart_table_column_sum,
        dataIndex: 'sum',
        key: 'sum',
        render: (text, record, index) => {
          const amount = record.price.amount
          const count = record.count
          return (<p>{amount * count} </p>)
        }
      }
    ]


    return (
      <div className="section">
        <div className="header">
          <h3>{lang.c_cart_table_title}</h3>
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