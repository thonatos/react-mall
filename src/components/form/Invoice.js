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
    console.log('radio checked', e.target.value)
    this.setState({
      invoice: e.target.value,
    });
  }

  render() {

    const invoiceArray = [
      {
        type: 'none',
        desc: '不需要发票'
      },
      {
        type: 'zzs',
        desc: '增值税普通发票'
      },
      {
        type: 'zzs',
        desc: '电子'
      },
      {
        type: 'zzs',
        desc: '纸质'
      },
      {
        type: 'zzs',
        desc: '个人'
      },
      {
        type: 'zzs',
        desc: '单位'
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

export default Invoice