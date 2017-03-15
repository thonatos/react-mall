import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as authActions from '../../actions/auth'

import React, { Component } from 'react'
import { Row, Col, message } from 'antd'

import LoginForm from './components/Login'
import { assets } from '../../data/'
import './Register.less'

class Login extends Component {
  componentWillReceiveProps(nextProps) {
    const { auth, router } = nextProps
    if (auth.isLoggedIn) {
      router.push('/product/nano')
    } else {
      message.error('Login Failed. Please Try Again.')
    }
  }

  handleLogin = (user) => {
    console.log('Received values of child: ', user)
    const { loginAuth } = this.props
    loginAuth(user)
  }

  render() {

    return (
      <Row className="container register" type="flex" align="top">

        <Col md={12} className="display-block">
          <img className="thumb" src={assets.sketch} alt="pro-sketch" />
        </Col>

        <Col md={12} className="interaction-block">

          <div className="inner">

            <h2 className="title">登录 Insta360</h2>
            <p className="tips">如果您已在Insta360其他产品上注册过Insta360账号，可用原有账号直接登录。</p>

            {/* register form */}
            <LoginForm handleLogin={this.handleLogin} />

            <Row type="flex" align="top" justify="space-between">
              <Col span={4}>
                <a href="#">忘记密码</a>
              </Col>
              <Col span={4}>
                <a href="#">注册</a>
              </Col>
            </Row>

          </div>
        </Col>

      </Row>
    )
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(authActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)