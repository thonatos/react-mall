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
        title: 'Email',
        dataIndex: 'email',
        key: 'email'
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
      }
    ]

    const { data } = this.props
    let dataSource = []
    if (Array.isArray(data) && data.length > 0) {
      dataSource = data.map((item, key) => {
        return {
          thumb: 'https://www.insta360.com/public/images/v6/download/air@1x.png',
          key: item.id,
          account: item.account,
          email: item.contact_email || 'none',
          sn: item.order_number,
          datetime: new Date(item.create_time).toISOString()
        }
      })
    }


    return (
      <Row className="cart" type="flex" align="top">
        <Col span={24}>
          <Table pagination={false}
            columns={columns}
            dataSource={dataSource}
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