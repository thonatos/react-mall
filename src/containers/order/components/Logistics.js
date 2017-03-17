import React, { Component } from 'react'
import { Radio } from 'antd'

const RadioButton = Radio.Button
const RadioGroup = Radio.Group


class Logistics extends Component {

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
        desc: '默认物流方式    免费'
      },
      {
        type: 'zzs',
        desc: '其他方式'
      }
    ]

    return (
      <div className="section">
        <div className="header">
          <h3>物流方式</h3>
        </div>
        <RadioGroup onChange={this.onChange} value={this.state.invoice} defaultValue={this.state.invoice} className="invoice-group">
          {
            invoiceArray.map((obj, key) =>
              <RadioButton value={key} key={key}>{obj.desc}</RadioButton>
            )
          }
        </RadioGroup>
      </div>
    )
  }
}

export default Logistics