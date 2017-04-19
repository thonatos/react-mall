import React, { Component, PropTypes } from 'react'
import { Row, Col } from 'antd'

import Auth from './components/Auth'
import Cart from './components/Cart'
import Header from './components/Header'
import Footer from './components/Footer'

import "./less/common/base.less"

export default class App extends Component {

  static propTypes = {
    children: PropTypes.element.isRequired
  }

  render() {    
    const { router } = this.props    
    const showCart = ((router.routes.length > 1 ? router.routes[1].path : '') === 'product')      

    return (
      <Row className="wrap">
        <Col span={24} className="g-header">
          <Header />
        </Col>      
        <Col span={24} className="content">
          {this.props.children}
        </Col>
        <Col span={24} className="g-footer">
          <Footer />
        </Col>

        <Auth router={this.props.router}/>
        <Cart router={this.props.router} showCart={showCart} />
      </Row>
    )
  }
}