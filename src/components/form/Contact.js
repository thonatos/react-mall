import React, { Component } from 'react'
import {Input, Checkbox } from 'antd'
import './Contact.less'

class Contact extends Component {

  onPressEnter = (e) => {
    e.preventDefault()
    console.log(e.target.value)
  }

  onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  }
  
  render() {    
    return (
      <div className="contact">
        <p>联系邮箱非常重要，我们会将订单信息和订单状态查询地址发送您的邮箱。请放心，我们将对您的私人信息严格保密。</p>
        <div>
          <Input onPressEnter={this.onPressEnter} placeholder="example@domain.com" />
        </div>
        <div>
          <Checkbox onChange={this.onChange}>获取 Insta360 最新产品、服务、软件升级等信息</Checkbox>
        </div>
      </div>
    )
  }
}

export default Contact