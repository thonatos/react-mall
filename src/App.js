import React, { Component, PropTypes } from 'react'
import { Row, Col } from 'antd'

import "./less/common/base.less"

export default class App extends Component {

  static propTypes = {
    children: PropTypes.element.isRequired
  }

  constructor(props){
    super(props)
    this.state = {
      intervalId: null
    }
  }

  componentDidMount(){
    console.log('init')
    // check auth       
      // set state
        // set interval
          // time: expired - current
            // exec: remove state
  }

  componentWillUnmount(){
    // disable interval
  }

  render() {

    console.log(this.props.router.location.pathname)

    return (
      <Row className="wrap">
        {/*
          <Breadcrumb router={this.props.router} />
        */}
        
        <Col span={24} className="content">
          {this.props.children}
        </Col>
        
      </Row>
    )
  }

}