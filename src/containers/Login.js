import React, { Component } from 'react'
import { Row, Col } from 'antd'
import './Register.less'

import sketch from '../assets/product/pro/sketch@2x.png'

import LoginForm from '../components/form/Login'

class Login extends Component {

  constructor(props) {
    super(props)
    this.state = {
      t: ''
    }
  }

  render() {

    return (
      <Row className="container register" type="flex" align="top">

        <Col md={12} className="display-block">
          <img className="thumb" src={sketch} alt="pro-sketch" />
        </Col>

        <Col md={12} className="interaction-block">
          <div className="inner">

            <h2 className="title">登录 Insta360</h2>
            <p className="tips">如果您已在Insta360其他产品上注册过Insta360账号，可用原有账号直接登录。</p>

            {/* register form */}
            <LoginForm>
            </LoginForm>

            <Row type="flex" align="top" justify="space-between">
              <Col span={3}>
                <a href="#">忘记密码</a>
              </Col>
              <Col span={3}>
              <a href="#">注册</a>
              </Col>
            </Row>

          </div>
        </Col>

      </Row>
    )
  }
}

export default Login