import React, { Component } from 'react'
import { Input } from 'antd'
import lang from '../../../language/'

class Remark extends Component {

  state = {    
    remark: ''
  }

  onBlur = (e) => {
    const { handleInputChange } = this.props
    const value = e.target.value
    this.setState({
      remark: value
    }, () => {
      if (handleInputChange) {
        handleInputChange('remark', this.state.remark)
      }
    })
  }

  render() {    
    return (
      <div className="section">
        <div className="header">
          <h3>{lang.c_remark_title}</h3>
        </div>
        <div className="contact">
          <p>{lang.c_remark_tips}</p>
          <div>
            <Input type="textarea" autosize={{ minRows: 2, maxRows: 6 }}  onBlur={this.onBlur} placeholder={lang.c_remark_input_remark_placeholder} />
          </div>
        </div>
      </div>
    )
  }
}

export default Remark