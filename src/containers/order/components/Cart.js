import React, { Component } from 'react'
import { Row, Col, Table } from 'antd'


class Cart extends Component {

  render() {

    const { title } = this.props
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

    const data = this.props.data

    return (
      <div className="section">
        <div className="header">
          <h3>{title}</h3>
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