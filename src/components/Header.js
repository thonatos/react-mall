import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as authActions from '../actions/auth'

import React, { Component } from 'react'
import { Row, Col, Menu, Dropdown, Icon } from 'antd'
import { Link } from 'react-router'

const BRAND = {
  href: 'https://www.insta360.com',
  eye: 'http://cloud.insta360.com/public/images/common/eye@2x.png',
  home: 'http://cloud.insta360.com/public/images/common/home@2x.png'
}

const links = [
  ['#', 'Home'],
  ['/order/list', 'Order']
]

class Header extends Component {
  onclick = (action, event) => {
    const { updateAuthAction, logout } = this.props.actions.auth
    event.preventDefault()        
    switch (action) {
      case 'register':
        updateAuthAction('register')
        break

      case 'login':
        updateAuthAction('login')
        break

      case 'logout':
        logout()
        break

      default:
        break
    }
  }

  getMenu = () => {
    const { auth } = this.props.reducer
    const menu = (
      <Menu>
        <Menu.Item>
          <Link onClick={this.onclick.bind(this, 'logout')} rel="noopener noreferrer">Logout</Link>
        </Menu.Item>
      </Menu>
    )

    if (auth.isLoggedIn) {
      return (
        <div className="menu-links">
          <Dropdown overlay={menu} >
            <a className="drop-down-link" href="#">
              {auth.email} <Icon type="down" />
            </a>
          </Dropdown>
        </div>
      )
    } else {
      return (
        <div className="menu-links">
          <Link onClick={this.onclick.bind(this, 'register')}>Register</Link>
          <Link onClick={this.onclick.bind(this, 'login')}>Log in</Link>
        </div>
      )
    }
  }


  render() {
    const menus = this.getMenu()
    return (
      <div className="component-header">
        <Row className="container">
          <Col span={18}>
            <a href={BRAND.href} alt="" className="home-brand">
              <div className="home-pic">
                <img src={BRAND.home} alt="" />
                <img src={BRAND.eye} alt="" />
              </div>
            </a>

            <ul className="menu">
              {
                links.map((v, k) => {
                  return (
                    <li className="menu-item" key={k}>
                      <Link to={v[0]}>
                        <span data-hover={v[1]}>{v[1]}</span>
                      </Link>
                    </li>
                  )
                })
              }
            </ul>
          </Col>

          <Col span={6} style={{ textAlign: 'right' }}>
            {menus}
          </Col>
        </Row>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    reducer: {
      auth: state.auth
    }
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      auth: bindActionCreators(authActions, dispatch)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)