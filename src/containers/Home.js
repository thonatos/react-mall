import React, { Component } from 'react'
import { Link } from 'react-router'

class Home extends Component {

  render() {

    const links = [
      ['/user/login', '登录'],
      ['/user/register', '注册'],
      ['/product/1', '产品页'],
      ['/order/list', '订单列表']
    ]

    return (
      <div className="container">
        <div style={{
          padding: '8em 0'
        }}>
          <p>快捷入口</p>
          <div style={{
            textAlign: 'right'
          }}>
            {
              links.map((v, k) => {
                return (<Link to={v[0]} key={k} style={{
                  margin: '0 1em'
                }}>{v[1]}</Link>)
              })
            }
          </div>
        </div>
      </div>
    )
  }
}

export default Home