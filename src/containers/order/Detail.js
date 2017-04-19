import React, { Component } from 'react'
import { Row, Col, Table } from 'antd'
import lang from '../../language/'
import './Detail.less'
import { ReduxHelper } from '../../helpers/'

const icon_order = 'https://static.insta360.cn/assets/mall/ic_order@2x.png'

class Detail extends Component {

  componentDidMount() {
    const { orderId } = this.props.params
    const { getOrderInfo } = this.props.actions.order
    getOrderInfo(orderId)
  }


  getTable = (data) => {

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

  render() {
    const { detailOrder } = this.props.reducer.order


    if (!detailOrder.order_number) {
      return (<div></div>)
    }

    const cartTable = this.getTable(detailOrder.items)

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
                    <h4>{lang.pay_detail_summary_pay_amount}</h4>
                    <p className="price">{detailOrder.payment.currency} {detailOrder.payment.amount}</p>
                  </div>
                </div>
              </div>
            </div>
          </Col>

          <Col span={24}>
            <div className="items">
              <h2 className="title">{lang.c_cart_table_column_name}</h2>
              {cartTable}
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default ReduxHelper(Detail)