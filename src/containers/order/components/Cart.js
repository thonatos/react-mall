import React, { Component } from 'react'
import { Row, Col, Table } from 'antd'


class Cart extends Component {

  render() {

    const columns = [
      {
        title: 'Thumb',
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
        title: 'Name',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: 'Count',
        dataIndex: 'count',
        key: 'count'
      },
      {
        title: 'Price',
        dataIndex: 'price',
        key: 'price'
      }
    ]

      // let _cart = [{
      //   count: 1,
      //   name: share.cart.product.info.name,
      //   key: share.cart.product.info.name,
      //   thumb: share.cart.product.displays[0].url,
      //   price: share.cart.commodity.price
      // }]    

    const data = this.props.data

    return (
      <div className="section">
        <div className="header">
          <h3>订单概览</h3>
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
          </Col>
        </Row>
      </div>

    )
  }
}

export default Cart