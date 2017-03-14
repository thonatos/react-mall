import React, { Component } from 'react'
import { Row, Col, Table } from 'antd'


class Orders extends Component {

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
        title: 'SN',
        dataIndex: 'sn',
        key: 'sn'
      },
      {
        title: 'Datetime',
        dataIndex: 'datetime',
        key: 'datetime'
      },
      {
        title: 'Price',
        dataIndex: 'price',
        key: 'price'
      }
    ]

    // const demoData = [
    //   {
    //     key: 'xxx',
    //     thumb: require('../assets/product/pro/pro-large@2x.png'),
    //     sn: 'Insta360 Pro',
    //     datetime: '2014-12-24 23:12:00',
    //     price: 2000,
    //   }
    // ]

    const data = this.props.data 

    return (
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
    )
  }
}

export default Orders