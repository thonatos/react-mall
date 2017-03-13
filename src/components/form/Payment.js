import React, { Component } from 'react'
import { Row, Col, Radio } from 'antd'

const RadioButton = Radio.Button
const RadioGroup = Radio.Group

import './Invoice.less'

class Payment extends Component {

  constructor(props) {
    super(props)
    this.state = {
      invoice: 0
    }
  }

  onChange = (e) => {
    console.log('radio checked', e.target.value)
    this.setState({
      invoice: e.target.value,
    });
  }

  render() {

    const invoiceArray = [
      {
        type: 'none',
        desc: '在线支付'
      },
      {
        type: 'zzs',
        desc: '货到付款'
      }                
    ]

    return (
      <Row type="flex" align="top">
        <Col md={12}>
          <RadioGroup onChange={this.onChange} value={this.state.invoice} defaultValue={this.state.invoice} className="invoice-group">
            {
              invoiceArray.map((obj, key) =>
                <RadioButton value={key} key={key}>{obj.desc}</RadioButton>
              )
            }
          </RadioGroup>
        </Col>
      </Row>

    )
  }
}

export default Payment