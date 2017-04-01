import React, { Component, PropTypes } from 'react'
import { Row, Col } from 'antd'

import "./less/common/base.less"

export default class App extends Component {

  static propTypes = {
    children: PropTypes.element.isRequired
  }

  render() {
    // console.log('#app:path', this.props.router.location.pathname)    
    return (
      <Row className="wrap">
        <Col span={24} className="content">
          {this.props.children}
        </Col>    
      </Row>
    )
  }

}