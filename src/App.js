import React, { Component, PropTypes } from 'react'
import { Row, Col } from 'antd'

import "./less/common/base.less"
import Footer from './components/Footer'

export default class App extends Component {

  static propTypes = {
    children: PropTypes.element.isRequired
  }

  render() {
    return (
      <Row className="wrap">
        <Col span={24} className="content">
          {this.props.children}
        </Col>
        <Col span={24} className="footer">
          <Footer />
        </Col>
      </Row>
    )
  }
}