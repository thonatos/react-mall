import React, { Component } from 'react'
import { Row, Col } from 'antd'
import './Register.less'

import RegisterForm from './components/Register'
import { assets } from '../data'

class Register extends Component {

  constructor(props) {
    super(props)
    this.state = {
      t: ''
    }
  }

  handleRegister = (v) => {
    console.log('Received values of child: ', v)
  }

  render() {

    return (
      <Row className="container register" type="flex" align="top">

        <Col md={12} className="display-block">
          <img className="thumb" src={assets.sketch} alt="pro-sketch" />
        </Col>

        <Col md={12} className="interaction-block">
          <div className="inner">

            <h2 className="title">注册 Insta360 帐号</h2>
            <p className="tips">如果您已在Insta360其他产品上注册过Insta360账号，可用原有账号直接登录。</p>

            {/* register form */}
            <RegisterForm handleRegister={this.handleRegister} />
            <p className="instruction">* 点击注册后，你将收到一个来自 Insta360 的验证邮件，请点击邮件中的链接完成邮箱认证</p>
          </div>
        </Col>

      </Row>
    )
  }
}

export default Register