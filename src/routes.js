import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Cache from './utils/cache'

import App from './App'
import { NoMatch, Home } from './containers'

import OrderList from './containers/order/List'
import OrderInfo from './containers/order/Info'

import UserLogin from './containers/user/Login'
import UserRegister from './containers/user/Register'

import ProductDetail from './containers/product/Detail'

const cache = new Cache()

function loggedIn() {
  const authString = cache.get('auth')
  const auth = JSON.parse(authString)
  return auth.isLoggedIn
}

function requireAuth(nextState, replace) {
  if (!loggedIn()) {
    replace({
      pathname: '/user/login'
    })
  }
}

export default (
  <Route path="/" component={App}>

    <IndexRoute component={Home} />

    <Route path="product">
      <IndexRoute component={NoMatch} />
      <Route path=":productName" component={ProductDetail} />
    </Route>

    <Route path="user">
      <IndexRoute component={NoMatch} />
      <Route path="login" component={UserLogin} />
      <Route path="register" component={UserRegister} />
    </Route>

    <Route path="order">
      <Route path="list" component={OrderList} onEnter={requireAuth} />
      <Route path="info" component={OrderInfo} onEnter={requireAuth} />
    </Route>
    <Route path="*" component={NoMatch} />
  </Route>
)