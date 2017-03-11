import React, { Component } from 'react'
import { Link } from 'react-router'
import { Row, Col, Menu } from 'antd'
import './Breadcrumb.less'

class Breadcrumb extends Component {

  constructor(props) {
    super(props)
    this.state = {
      current: '0'
    }
  }

  handleClick = (e) => {
    this.setState({
      current: e.key
    })
  }

  render() {

    const menus = [
      {
        name: 'Home',
        href: '/'
      },
      {
        name: 'Product',
        href: '/product/pro'
      },
      {
        name: 'Order',
        href: '/order/confirm'
      },
      {
        name: 'Orders',
        href: '/order/list'
      }           
    ]
        
    const {router} = this.props
      console.log(router)

    return (
      <Row className="breadcrumb" type="flex" align="top">
        {/* Breadcrumb */}

        <Col span={24} className="breadcrumb container">

          <Col md={8}>
            <span className="current-path">
              {router.location.pathname}
            </span>
          </Col>

          <Col xs={24} md={16}>
            <Menu
              onClick={this.handleClick}
              selectedKeys={[this.state.current]}
              mode="horizontal"
              style={{
                background: 'transparent',
                borderBottom: 'none',
                float: 'right'
              }}>
              {
                menus.map((obj, key) =>
                  <Menu.Item key={key} >
                    <Link to={obj.href}>{obj.name}</Link>
                  </Menu.Item>
                )
              }
            </Menu>
          </Col>
        </Col>
      </Row>
    )
  }
}

export default Breadcrumb