import React, { Component } from 'react'
import { Input, Checkbox } from 'antd'


class Contact extends Component {

  state = {
    email: '',
    subscribe: false
  }

  handle = () => {
    const { submitType, handleInputChange } = this.props
    if (handleInputChange) {
      handleInputChange(submitType, {
        email: this.state.email,
        subscribe: this.state.subscribe
      })
    }
  }

  onBlur = (e) => {
    const { submitType, handleInputChange } = this.props
    const value = e.target.value
    this.setState({
      email: value
    }, () => {
      if (handleInputChange) {
        handleInputChange(submitType, this.state)
      }
    })

  }

  onChange = (e) => {
    const { submitType, handleInputChange } = this.props
    const checked = e.target.checked

    this.setState({
      subscribe: checked
    }, () => {
      if (handleInputChange) {
        handleInputChange(submitType, this.state)
      }
    })
  }

  render() {
    return (

      <div className="section">
        <div className="header">
          <h3>联系邮箱</h3>
        </div>
        <div className="contact">
          <p>联系邮箱非常重要，我们会将订单信息和订单状态查询地址发送您的邮箱。请放心，我们将对您的私人信息严格保密。</p>
          <div>
            <Input onBlur={this.onBlur} placeholder="example@domain.com" />
          </div>
          <div>
            <Checkbox onChange={this.onChange}>获取 Insta360 最新产品、服务、软件升级等信息</Checkbox>
          </div>
        </div>
      </div>
    )
  }
}

export default Contact