import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as orderActions from '../../actions/order'
import * as authActions from '../../actions/auth'

import React, { Component } from 'react'
import { Row, Col, Table, Button } from 'antd'

import './List.less'

class List extends Component {

  componentDidMount() {
    const { getUserOrders, restoreAuth } = this.props.actions
    restoreAuth()
    getUserOrders()
  }

  onClick = (action, value) => {
    console.log(action, value)
  }

  render() {
    const { orders, auth } = this.props.reducer

    const profile = {
      avatar: 'https://static.insta360.cn/assets/mall/ic_avatar@2x.png',
      mail: auth.email
    }

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
        title: 'Order Number',
        dataIndex: 'on',
        key: 'on'
      },
      {
        title: 'Created Time',
        dataIndex: 'created',
        key: 'created'
      },
      {
        title: 'Payment',
        dataIndex: 'payment',
        key: 'payment'
      },
      {
        title: 'State',
        dataIndex: 'state',
        key: 'state'
      },      
      {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
        render: (text, record, index) => {          
          if (record.state === 0) {
            return (<div>
              <Button className="action-btn" onClick={this.onClick.bind(this, 'view', record)}>View</Button>
              <Button className="action-btn" onClick={this.onClick.bind(this, 'pay', record)}>Pay Now</Button>
              <Button className="action-btn" onClick={this.onClick.bind(this, 'cancel', record)}>Cancel</Button>
            </div>)
          }
          return (<Button className="action-btn" onClick={this.onClick.bind(this, 'view', record)}>View</Button>)
        }
      }
    ]

    let dataSource = []
    if (Array.isArray(orders) && orders.length > 0) {
      dataSource = orders.map((item, key) => {
        return {
          thumb: 'https://www.insta360.com/public/images/v6/download/air@1x.png',
          key: item.id,
          id: item.id,
          account: item.account,
          email: item.contact_email || 'none',
          on: item.order_number,
          created: new Date(item.create_time).toISOString(),
          state: item.state,
          payment: item.pay_type,
          action: item.state
        }
      })
    }

    return (

      <div className="list">
        <div className="breadcrumb">
          <div className="container links">
            <h2>My Account</h2>
          </div>
        </div>

        <Row className="container detail">

          <Col span={6} className="account">
            <img src={profile.avatar} alt="" style={{ maxWidth: '100px' }} />
            <p>{profile.mail}</p>
          </Col>

          <Col span={18} className="info">
            <Table pagination={false}
              columns={columns}
              dataSource={dataSource}              
            />
          </Col>
        </Row >
      </div>

    )
  }
}

function mapStateToProps(state) {
  return {
    reducer: {
      orders: state.order.orders,
      auth: state.auth
    }
  }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators({ ...orderActions, restoreAuth: authActions.restoreAuth }, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(List)