import React, { Component } from 'react'
import { Row, Col, Radio } from 'antd'

const RadioButton = Radio.Button
const RadioGroup = Radio.Group

import './Invoice.less'

class Invoice extends Component {

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

    this.props.handleInvoice(this.props.data[this.state.invoice])
  }
  

  render() {
    const invoice = this.props.data  
    return (
      <Row type="flex" align="top">
        <Col md={12}>
          <RadioGroup onChange={this.onChange} className="invoice-group">
            {
              invoice.map((obj, key) =>
                <RadioButton value={key} key={key}>{obj.name}</RadioButton>
              )
            }
          </RadioGroup>
        </Col>
      </Row>

    )
  }
}

export default Invoice