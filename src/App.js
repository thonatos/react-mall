import React, { Component, PropTypes } from 'react'
import { Row, Col } from 'antd'
import {Breadcrumb} from './components'

// style
import "./less/common/base.less"

export default class App extends Component {

  static propTypes = {
    children: PropTypes.element.isRequired
  }

  render() {
    
    return (
      <Row className="wrap">
        <Breadcrumb router={this.props.router} />
        <Col span={24} className="content">
          {this.props.children}
        </Col>
      </Row>
    )
  }

}