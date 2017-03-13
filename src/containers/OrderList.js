import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import React, { Component } from 'react'
import { Row, Col, Tabs, Menu } from 'antd'

const TabPane = Tabs.TabPane

import Orders from '../components/Orders'
import './OrderList.less'

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch)
}

class OrderList extends Component {

  state = {
    current: '1',
  }

  changeTheme = (value) => {
    this.setState({
      theme: value ? 'dark' : 'light',
    });
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

    const user = {
      thumb: require('../assets/product/pro/pro-large@2x.png'),
      mail: 'thonatos@sina.com'
    }

    const d1 = [
      {
        key: 'xxx',
        thumb: require('../assets/product/pro/pro-large@2x.png'),
        sn: 'Insta360 Pro',
        datetime: '2014-12-24 23:12:00',
        price: 2000,
      }
    ]

    const d2 = [
      {
        key: 'xxx',
        thumb: require('../assets/product/pro/pro-large@2x.png'),
        sn: 'Insta360 Nano',
        datetime: '2014-12-24 23:12:00',
        price: 100000,
      }
    ]

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
                <img src={user.thumb} alt="" style={{ maxWidth: '100px' }} />
              </Col>
              <Col span={20}>
                <h2>{user.mail}</h2>
                <p>{user.mail}</p>
              </Col>
            </Row>
          </Col>

          {/* Detail */}
          <Col span={24} className="orders">
            <Tabs defaultActiveKey="1" onChange={this.callback}>
              <TabPane tab="全部有效订单" key="1">
                <Orders data={d1}></Orders>
              </TabPane>
              <TabPane tab="待支付" key="2">
                <Orders data={d2}></Orders>
              </TabPane>
              <TabPane tab="待收货" key="3">
                <Orders data={d2}></Orders>
              </TabPane>
              <TabPane tab="已关闭" key="4">
                <Orders data={d2}></Orders>
              </TabPane>                            
            </Tabs>
          </Col>
        </Col>
      </Row >
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderList)