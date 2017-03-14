import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import React, { Component } from 'react'
import { Row, Col, Tabs, Menu } from 'antd'

const TabPane = Tabs.TabPane

import Orders from './components/Orders'
import './List.less'

import { user } from '../data'

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch)
}

class List extends Component {

  state = {
    current: '1',
  }

  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  }

  callback(key) {
    console.log(key);
  }

  render() {

    const profile = user.profile
    const orders = user.orders

    console.log(orders)

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
            <Tabs defaultActiveKey="1" onChange={this.callback}>
              <TabPane tab="全部有效订单" key="1">
                <Orders data={orders.receiving}></Orders>
              </TabPane>
              <TabPane tab="待支付" key="2">
                <Orders data={orders.paying}></Orders>
              </TabPane>
              <TabPane tab="待收货" key="3">
                <Orders data={orders.receiving}></Orders>
              </TabPane>
              <TabPane tab="已关闭" key="4">
                <Orders data={orders.closed}></Orders>
              </TabPane>
            </Tabs>
          </Col>
        </Col>
      </Row >
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List)