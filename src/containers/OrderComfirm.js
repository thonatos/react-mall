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
      <Row className="container order" type="flex" align="top">
      
        <Col span={24}>
          <h2>Distribution</h2>
          <Distribution handleResult={this.handleDistribution}></Distribution>
        </Col>

        <Col span={24}>
          <h2>Invoice</h2>
          <Invoice></Invoice>
        </Col>

        <Col span={24}>
          <h2>Payment</h2>
          <Payment></Payment>
        </Col>

        <Col span={24}>
          <h2>Logistics</h2>
          <Logistics></Logistics>
        </Col>

        <Col span={24}>
          <h2>Email</h2>
          <Contact></Contact>
        </Col>

        <Col span={24}>
          <h2>Preview</h2>
          <Cart></Cart>
        </Col>

        <Col span={24} style={{
          textAlign: 'right'
        }}>          
          <Button type="primary">Submit</Button>
        </Col>

      </Row>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderComfirm)