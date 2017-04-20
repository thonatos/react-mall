import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as authActions from '../actions/auth'

import React, { Component } from 'react'
import { Row, Col, Modal } from 'antd'

import LoginForm from './form/Login'
import RegisterForm from './form/Register'
import RetrieveForm from './form/Retrieve'

import './Auth.less'
import { LANG } from '../locales/'

const STATUS_MAP = {
  'none': false,
  'done': false,
  'register': true,
  'login': true,
  'retrieve': true
}

class Auth extends Component {

  componentWillReceiveProps(nextProps) {

    const { router } = nextProps
    const {redirectUrl, authAction, isLoggedIn} = nextProps.reducer
    const { setRedirect } = nextProps.actions
    
    // console.log('xxxx', isLoggedIn, authAction)
    if(authAction === 'none' && !isLoggedIn){
      router.push('/')
    }

    if(authAction === 'done' && redirectUrl !== ''){
      console.log('####', redirectUrl)
      setRedirect('')
      router.push(redirectUrl)
    }    
  }

  handleCancel = (e) => {
    const { updateAuthAction } = this.props.actions
    updateAuthAction('none')
  }

  handleLogin = (user) => {
    const { login } = this.props.actions
    login(user)
  }

  handleRetrieve = (user) => {
    const { retrieve } = this.props.actions
    retrieve(user)
  }

  handleRegister = (user) => {
    const { register } = this.props.actions
    register(user)
  }

  handleGetCaptcha = (user) => {
    const { sendCaptcha } = this.props.actions
    sendCaptcha(user)
  }

  getModalStatus() {
    const { authAction } = this.props.reducer
    return STATUS_MAP[authAction]
  }

  getForm() {
    const { authAction } = this.props.reducer
    switch (authAction) {
      case 'register':
        return (
          <Row className="auth-register">
            <div className="auth-suggestion">
              {LANG.auth_register_tips} <a href="#" onClick={this.handleClick.bind(this, 'login')}>{LANG.auth_register_tips_login}</a>
            </div>
            <Col span={24}>
              <RegisterForm
                register={this.handleRegister}
                getCaptcha={this.handleGetCaptcha} />
            </Col>
          </Row>
        )

      case 'login':
        return (
          <Row className="auth-login">
            <div className="auth-suggestion">
              {LANG.auth_login_tips} <a href="#" onClick={this.handleClick.bind(this, 'register')}>{LANG.auth_login_tips_register}</a> 
              {/* {LANG.auth_login_tips_retrieve_msg}<a href="#" onClick={this.handleClick.bind(this, 'retrieve')}>{LANG.auth_login_tips_retrieve}</a> */}
            </div>
            <Col span={24}>
              <LoginForm handleLogin={this.handleLogin} />
            </Col>
            </Row>
        )

      case 'retrieve':
        return (
          <Row className="auth-retrieve">
            <div className="auth-suggestion">
              {LANG.auth_retrieve_tips}
            </div>
            <Col span={24}>
              <RetrieveForm
                retrieve={this.handleRetrieve}
                getCaptcha={this.handleGetCaptcha}
              />
            </Col>
          </Row>
        )

      case 'none':
        return (
          <Row className="auth-none">
          </Row>
        )

      default:
        return (
          <Row className="auth-none">
          </Row>
        )
    }

  }

  getTitle() {
    const { authAction } = this.props.reducer
    switch (authAction) {
      case 'register':
        return LANG.auth_register_title
      case 'login':
        return LANG.auth_login_title

      case 'retrieve':
        return LANG.auth_retrieve_title

      default:
        return ''
    }

  }

  handleClick = (type) => {
    const { updateAuthAction } = this.props.actions
    updateAuthAction(type)
  }

  render() {
    const form = this.getForm()
    const title = this.getTitle()
    const showAuthModal = this.getModalStatus()

    return (
      <Modal title={title}
        visible={showAuthModal}
        footer={null}
        onCancel={this.handleCancel}
      >
        {form}
      </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(Auth)