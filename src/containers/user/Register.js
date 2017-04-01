import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as authActions from '../../actions/auth'

import React, { Component } from 'react'
import { Row, Col } from 'antd'
import './Register.less'

import RegisterForm from './components/Register'

const language = {
  "USER_REGISTER_TITLE": "Register Insta360 Account",
  "USER_REGISTER_DESC": "If you have already registered an Insta360 account, you can use it to log in.",
  "USER_REGISTER_TIPS": "Click ‘Register’ and you’ll receive an email with a confirmation link from Insta360. Please click the link in the email to complete the process.",
  "USER_REGISTER_BTN": "REGISTER",
  "USER_REGISTER_CAPTCHA": "verification code",
  "USER_REGISTER_EMAIL": "email",
  "USER_REGISTER_PASSWORD": "password",
  "USER_REGISTER_PASSWORD_CONFIRM": "password confirm"
}

const PRO_SKETCH = 'https://static.insta360.cn/assets/mall/pro_sketch@1x.png'

class Register extends Component {

  componentWillReceiveProps(nextProps) {
    const { auth, router } = nextProps
    if (auth.register) {      
      router.push('/user/login')
    }
  }

  handleGetCaptcha = (user) => {
    const { sendCaptcha } = this.props.actions
    user['type'] = 'signup'
    sendCaptcha(user)
  }

  handleRegister = (user) => {
    const { register } = this.props.actions
    register(user)
  }

  render() {

    return (
      <Row className="container register" type="flex" align="top">
        <Col md={12} className="display-block">
          <img className="thumb" src={PRO_SKETCH} alt="pro-sketch" />
        </Col>

        <Col md={12} className="interaction-block">

          <div className="inner">

            <h2 className="title">{language.USER_REGISTER_TITLE}</h2>
            <p className="tips">{language.USER_REGISTER_DESC}</p>

            <RegisterForm
              register={this.handleRegister}
              getCaptcha={this.handleGetCaptcha}
            />
            <p className="instruction">{language.USER_REGISTER_TIPS}</p>
          </div>
        </Col>

      </Row>
    )
  }
}

function mapStateToProps(state) {
  return {
    reducer: state.auth
  }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(authActions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)