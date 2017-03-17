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
    this.setState({
      invoice: e.target.value
    })

    this.props.handlePayment(this.props.data[this.state.invoice])
  }
  

  render() {
    const payments = this.props.data  
    return (
      <Row type="flex" align="top">
        <Col md={12}>
          <RadioGroup onChange={this.onChange} value={this.state.invoice} defaultValue={this.state.invoice} className="invoice-group">
            {
              payments.map((obj, key) =>
                <RadioButton value={key} key={key}>{obj.name}</RadioButton>
              )
            }
          </RadioGroup>
        </Col>
      </Row>
    )
  }
}

export default Payment