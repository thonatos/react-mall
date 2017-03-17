import React, { Component } from 'react'
import { Radio } from 'antd'

const RadioButton = Radio.Button
const RadioGroup = Radio.Group


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
      <div className="section">
        <div className="header">
          <h3>发票信息</h3>
        </div>
        <RadioGroup onChange={this.onChange} className="invoice-group">
          {
            invoice.map((obj, key) =>
              <RadioButton value={key} key={key}>{obj.name}</RadioButton>
            )
          }
        </RadioGroup>
      </div>
    )
  }
}

export default Invoice