import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import React, { Component } from 'react'
import { Row, Col, Button } from 'antd'

import Distribution from './components/Distribution'
import Invoice from './components/Invoice'
import Payment from './components/Payment'
import Logistics from './components/Logistics'
import Contact from './components/Contact'
import Cart from './components/Cart'

import './Info.less'

import { order, user } from '../data'

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch)
}

class Info extends Component {

  handleDistribution = (v) => {
    console.log('Received values of child: ', v)
  }

  render() {

    return (
      <Row className="container order">

        <Col span={24}>
          <Distribution data={{
            order: order,
            user: user
          }} handleResult={this.handleDistribution}></Distribution>
        </Col>

        <Col span={24}>
          <h3>发票信息</h3>
          <Invoice data={order.invoice}></Invoice>
        </Col>

        <Col span={24}>
          <h3>支付方式</h3>
          <Payment></Payment>
        </Col>

        <Col span={24}>
          <h3>物流方式</h3>
          <Logistics></Logistics>
        </Col>

        <Col span={24}>
          <h3>联系邮箱</h3>
          <Contact></Contact>
        </Col>

        <Col span={24}>
          <h3>订单概览</h3>
          <Cart data={user.cart}></Cart>
        </Col>

        <Col span={24} className="action-block">
          <Button type="primary">提交订单</Button>
          <p className="tips">点击提交订单表示您同意 <a href="#">Insta360 商城的销售政策</a></p>
        </Col>

      </Row>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Info)