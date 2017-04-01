import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as authActions from '../../actions/auth'

import React, { Component } from 'react'
import { Link } from 'react-router'
import { Row, Col } from 'antd'

import LoginForm from './components/Login'
import './Register.less'

const language = {
  "USER_LOGIN_TITLE": "Log in Insta360",
  "USER_LOGIN_DESC": "If you have already registered an Insta360 account, you can use it to log in.",
  "USER_LOGIN_BTN": "LOG IN",
  "USER_LOGIN_TIPS_FORGET_PASSWORD": "Forget your password？",
  "USER_LOGIN_TIPS_REGISTER": "Register"
}

const PRO_SKETCH = 'https://static.insta360.cn/assets/mall/pro_sketch@1x.png'

class Login extends Component {

  componentDidMount() {
    const { auth, router } = this.props
    if (auth.isLoggedIn) {
      router.push('/product/1')
    }
  }

  componentWillReceiveProps(nextProps) {
    const { auth, router } = nextProps
    if (auth.isLoggedIn) {
      router.push('/product/1')
    }
  }

  handleLogin = (user) => {    
    const { login } = this.props
    login(user)
  }

  render() {

    return (
      <Row className="container register" type="flex" align="top">

        <Col md={12} className="display-block">
          <img className="thumb" src={PRO_SKETCH} alt="pro-sketch" />
        </Col>

        <Col md={12} className="interaction-block">

          <div className="inner">

            <h2 className="title">{language.USER_LOGIN_TITLE}</h2>
            <p className="tips">{language.USER_LOGIN_DESC}</p>
            
            <LoginForm handleLogin={this.handleLogin} />

            <Row type="flex" align="top" justify="space-between">
              <Col span={12}>
                <Link to='/user/retrieve'>{language.USER_LOGIN_TIPS_FORGET_PASSWORD}</Link>
              </Col>
              <Col span={4}>
                <Link to='/user/register'>{language.USER_LOGIN_TIPS_REGISTER}</Link>
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