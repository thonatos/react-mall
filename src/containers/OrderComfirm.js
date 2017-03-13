import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import React, { Component } from 'react'
import { Row, Col, Button } from 'antd'

import Distribution from '../components/form/Distribution'
import Invoice from '../components/form/Invoice'
import Payment from '../components/form/Payment'
import Logistics from '../components/form/Logistics'
import Contact from '../components/form/Contact'
import Cart from '../components/form/Cart'

import './Order.less'

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch)
}

class OrderComfirm extends Component {

  handleDistribution = (v) => {
    console.log('Received values of child: ', v)
  }

  render() {
    return (
      <Row className="container order">

        <Col span={24}>
          <Distribution handleResult={this.handleDistribution}></Distribution>
        </Col>

        <Col span={24}>
          <h3>发票信息</h3>
          <Invoice></Invoice>
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
          <Cart></Cart>
        </Col>

        <Col span={24} className="action-block">
          <Button type="primary">提交订单</Button>
          <p className="tips">点击提交订单表示您同意 <a href="#">Insta360 商城的销售政策</a></p>
        </Col>

      </Row>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderComfirm)