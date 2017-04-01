import React from 'react'
import { Route, IndexRoute, IndexRedirect } from 'react-router'
import Cache from './utils/cache'

import App from './App'

// import { NoMatch, Home } from './containers'
import { NoMatch } from './containers'

import OrderList from './containers/order/List'
import OrderConfirm from './containers/order/Confirm'

import UserLogin from './containers/user/Login'
import UserRegister from './containers/user/Register'
import UserRetrieve from './containers/user/Retrieve'

import ProductDetail from './containers/product/Detail'

const cache = new Cache()

function loggedIn() {
  const auth_raw = cache.get('auth') || false
  if (auth_raw) {
    const auth = JSON.parse(auth_raw)        
    const expired = (Math.ceil(Date.now() / 1000) < auth.expiration)    
    return auth.isLoggedIn && expired
  }
  return auth_raw
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

    {/*
      <IndexRoute component={Home} />
    */}

    <IndexRedirect to="/product/1" />

    <Route path="product">
      <IndexRoute component={NoMatch} />
      <Route path=":productName" component={ProductDetail} />
    </Route>

    <Route path="user">
      <IndexRoute component={NoMatch} />
      <Route path="login" component={UserLogin} />
      <Route path="register" component={UserRegister} />
      <Route path="retrieve" component={UserRetrieve} />
    </Route>

    <Route path="order">
      <Route path="list" component={OrderList} onEnter={requireAuth} />
      <Route path="confirm" component={OrderConfirm} onEnter={requireAuth} />
    </Route>
    <Route path="*" component={NoMatch} />
  </Route>
)