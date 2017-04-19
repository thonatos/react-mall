import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as authActions from '../actions/auth'

import React, { Component } from 'react'
import { Row, Col, Menu, Dropdown, Icon } from 'antd'
import { Link } from 'react-router'

// const HeaderMenu = {
//   logo: 'https://static.insta360.com/assets/mall/logo_mall_zh@2x.png',
//   brand: {
//     href: 'https://www.insta360.com',
//     eye: 'https://static.insta360.com/assets/mall/eye@2x.png',
//     home: 'https://static.insta360.com/assets/mall/home@2x.png'
//   },
//   links: [
//     ['/', 'Home']
//   ]
// }

const HeaderMenu = {
  logo: 'https://static.insta360.com/assets/mall/logo_mall_en@2x.png',  
  brand: {
    href: 'https://www.insta360.com',
    eye: 'https://static.insta360.com/assets/mall/eye@2x.png',
    home: 'https://static.insta360.com/assets/mall/home@2x.png'
  },
  links: [
    ['/', 'Home']
  ]
}

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
          <Link to='/order/list' rel="noopener noreferrer">Orders</Link>
        </Menu.Item>
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
    const {brand, logo, links} = HeaderMenu
    return (
      <div className="component-header">
        <Row className="container">
          <Col span={18}>
            <a href={brand.href} alt="" className="header-home">
              <div className="home-pic">
                <img src={brand.home} alt="" />
                <img src={brand.eye} alt="" />
              </div>
            </a>

            <Link to="/" className="header-brand">
              <img src={logo} alt="" />
            </Link>

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