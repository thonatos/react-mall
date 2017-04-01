import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as authActions from '../../actions/auth'

import React, { Component } from 'react'
import { Row, Col } from 'antd'

import RetrieveForm from './components/Retrieve'
import './Register.less'

const language = {
  "USER_RETRIEVE_TITLE": "Password Retrieval",
  "USER_RETRIEVE_BTN": "RETRIEVE"
}

const PRO_SKETCH = 'https://static.insta360.cn/assets/mall/pro_sketch@1x.png'

class Retrieve extends Component {

  componentWillReceiveProps(nextProps) {
    const { auth, router } = nextProps
    if (auth.retrieve) {
      router.push('/user/login')
    }
  }

  handleGetCaptcha = (user) => {
    const { sendCaptcha } = this.props.actions
    user['type'] = 'forgetAccountPassword'
    sendCaptcha(user)
  }

  handleRetrieve = (user) => {
    const { retrieve } = this.props.actions
    retrieve(user)
  }

  render() {

    return (
      <Row className="container register" type="flex" align="top">

        <Col md={12} className="display-block">
          <img className="thumb" src={PRO_SKETCH} alt="pro-sketch" />
        </Col>

        <Col md={12} className="interaction-block">
          <div className="inner">
            <h2 className="title">{language.USER_RETRIEVE_TITLE}</h2>
            <RetrieveForm
              retrieve={this.handleRetrieve}
              getCaptcha={this.handleGetCaptcha}
            />
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

export default connect(mapStateToProps, mapDispatchToProps)(Retrieve)