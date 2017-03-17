import React, { Component } from 'react'
import { Radio } from 'antd'

const RadioButton = Radio.Button
const RadioGroup = Radio.Group


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
      <div className="section">
        <div className="header">
          <h3>支付方式</h3>
        </div>
        <RadioGroup onChange={this.onChange} value={this.state.invoice} defaultValue={this.state.invoice} className="invoice-group">
          {
            payments.map((obj, key) =>
              <RadioButton value={key} key={key}>{obj.name}</RadioButton>
            )
          }
        </RadioGroup>
      </div>
    )
  }
}

export default Payment