import React, { Component } from 'react'
import { Input } from 'antd'
import { LANG } from '../../../locales/'

class TaxNumber extends Component {

  state = {
    individual_tax_number: ''
  }

  onBlur = (e) => {
    const { handleInputChange } = this.props
    const value = e.target.value
    this.setState({
      individual_tax_number: value
    }, () => {
      if (value) {
        this.setState({
          errMsg: ''
        })
        if (handleInputChange) {
          handleInputChange('individual_tax_number', this.state.individual_tax_number)
        }
      } else {
        this.setState({
          errMsg: LANG.c_tax_number_input_invalid
        })
      }
    })
  }

  render() {
    const { visible } = this.props
    return (
      <div className="section" style={{
        display: (visible ? 'block' : 'none')
      }}>
        <div className="header">
          <h3>{LANG.c_tax_number_title}</h3>
        </div>
        <div className="contact">
          <p>{LANG.c_tax_number_tips}</p>
          <div>
            <Input onBlur={this.onBlur} placeholder={LANG.c_tax_number_input_placeholder} />
            {
              this.state.errMsg ? (<span style={{ color: 'red' }}>{this.state.errMsg}</span>) : ('')
            }
          </div>
        </div>
      </div>
    )
  }
}

export default TaxNumber