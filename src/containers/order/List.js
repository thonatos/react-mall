import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as orderActions from '../../actions/order'

import React, { Component } from 'react'
import { Row, Col, Tabs, Menu } from 'antd'

const TabPane = Tabs.TabPane

import Orders from './components/Orders'
import './List.less'

// import { user } from '../data'

class List extends Component {

  state = {
    current: '0',
  }

  componentDidMount() {
    const { getUserOrders } = this.props.actions
    getUserOrders('0')
  }

  handleClick = (e) => {
    this.setState({
      current: e.key,
    });
  }

  callback = (key) => {
    const { getUserOrders } = this.props.actions
    getUserOrders(key)
  }

  render() {

    const { orders } = this.props.reducer
    const profile = {
      avatar: require('../../assets/product/pro/pro-large@2x.png'),
      mail: 'YOUR_EMAIL_ADDRESS@DOMAIN.COM'
    }

    return (
      <Row className="container order-list" type="flex" align="top">
        <Col span={8} className="sidebar">
          <Menu
            theme={'light'}
            onClick={this.handleClick}
            style={{ width: 240 }}
            selectedKeys={[this.state.current]}
            mode="inline"
          >
            <Menu.Item key="1">Account</Menu.Item>
            <Menu.Item key="2">Orders</Menu.Item>
          </Menu>

        </Col>

        <Col span={16} className="info">
          {/* Account */}
          <Col span={24} className="account">
            <Row type="flex" align="middle">
              <Col span={4}>
                <img src={profile.avatar} alt="" style={{ maxWidth: '100px' }} />
              </Col>
              <Col span={20}>
                <h2>{profile.mail}</h2>
                <p>{profile.mail}</p>
              </Col>
            </Row>
          </Col>

          {/* Detail */}
          <Col span={24} className="orders">
            <Tabs defaultActiveKey={this.state.current} onChange={this.callback}>
              <TabPane tab="全部订单" key="0">
                <Orders data={orders.init}></Orders>
              </TabPane>
              <TabPane tab="已支付" key="1">
                <Orders data={orders.payed}></Orders>
              </TabPane>
              <TabPane tab="待支付" key="2">
                <Orders data={orders.prepared}></Orders>
              </TabPane>
              <TabPane tab="待收货" key="3">
                <Orders data={orders.onDelivery}></Orders>
              </TabPane>
              <TabPane tab="待收货" key="9">
                <Orders data={orders.success}></Orders>
              </TabPane>
              <TabPane tab="已关闭" key="-1">
                <Orders data={orders.canceled}></Orders>
              </TabPane>
            </Tabs>
          </Col>
        </Col>
      </Row >
    )
  }
}

function mapStateToProps(state) {
  return {
    reducer: {
      orders: state.order.orders
    }
  }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(orderActions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(List)