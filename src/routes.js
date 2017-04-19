import React from 'react'
import { Route, IndexRoute, IndexRedirect } from 'react-router'
import Cache from './utils/cache'

import App from './App'
import { NoMatch } from './containers'
import OrderList from './containers/order/List'
import OrderPay from './containers/order/Pay'
import OrderDetail from './containers/order/Detail'
import OrderConfirm from './containers/order/Confirm'
import ProductDetail from './containers/product/Detail'

import PagePrivacy from './containers/page/Privacy'
import PageShipping from './containers/page/Shipping'
import PageTerms from './containers/page/Terms'

const cache = new Cache()

function requireAuth(nextState, replace) {

  function loggedIn() {
    const auth_raw = cache.get('auth') || false
    if (auth_raw) {
      const auth = JSON.parse(auth_raw)
      const expired = Math.ceil(Date.now() / 1000) < auth.expiration
      return auth.isLoggedIn && expired
    }
    return auth_raw
  }

  if (!loggedIn()) {
    replace({
      // pathname: '/user/login'
      pathname: '/product/1'
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
    <Route path="order">
      <Route path="detail" onEnter={requireAuth}>
        <IndexRoute component={NoMatch} />
        <Route path=":orderId" component={OrderDetail} />
      </Route>
      <Route path="pay" onEnter={requireAuth}>
        <IndexRoute component={NoMatch} />
        <Route path=":orderId" component={OrderPay} />
      </Route>
      <Route path="list" component={OrderList} onEnter={requireAuth} />
      <Route path="confirm" component={OrderConfirm} onEnter={requireAuth} />
    </Route>
    <Route path="page">
      <IndexRoute component={NoMatch} />
      <Route path="privacy" component={PagePrivacy} />
      <Route path="shipping-policy" component={PageShipping} />
      <Route path="terms" component={PageTerms} />
    </Route>


    <Route path="*" component={NoMatch} />
  </Route>
)