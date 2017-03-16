import axios from 'axios'
import md5 from 'crypto-js/md5'

import React, { Component } from 'react'
import { Row, Col, message } from 'antd'
import './Register.less'

import RegisterForm from './components/Register'
import { assets } from '../data'

const USER_REGISTER = 'https://api.insta360.com/user/v1/account/signup'
const CAPTCHA_SEND = 'https://api.insta360.com/user/v1/captcha/send'

class Register extends Component {

  handleGetCaptcha = (user) => {
    user['type'] = 'signup'
    axios({
      url: CAPTCHA_SEND,
      timeout: 10000,
      method: 'post',
      data: user,
      responseType: 'json'
    }).then(function (response) {
      const data = response.data
      if (data.code === 0) {
        console.log('#captcha:send')
      } else {
        message.error(data.errorMsg)
      }
    }).catch(function (response) {
      message.error('发送失败，请重试')
    })
  }

  handleRedict() {
    const { router } = this.props
    router.push('/product/nano')
  }

  handleRegister = (user) => {
    user['source'] = 'shop'
    user['password'] = md5(user.password).toString()
    delete user['confirm']

    axios({
      url: USER_REGISTER,
      timeout: 10000,
      method: 'post',
      data: user,
      responseType: 'json'
    }).then(function (response) {
      const data = response.data
      if (data.code === 0) {
        console.log('#register:success')
        message.success('注册成功，请使用该账号登录', 5, this.handleRedict)
      } else {
        message.error(data.errorMsg)
      }
    }).catch(function (response) {
      message.error('发送失败，请重试')
    })
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
            <RegisterForm
              register={this.handleRegister}
              getCaptcha={this.handleGetCaptcha}
            />
            <p className="instruction">* 点击注册后，你将收到一个来自 Insta360 的验证邮件，请点击邮件中的链接完成邮箱认证</p>
          </div>
        </Col>

      </Row>
    )
  }
}

export default Register