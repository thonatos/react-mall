import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './App'

import { NoMatch, Home, Product, OrderComfirm, OrderList, Register, Login } from './containers'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="user">
      <IndexRoute component={NoMatch} />
      <Route path="register" component={Register} />
      <Route path="login" component={Login} />      
    </Route>    
    <Route path="product">
      <IndexRoute component={NoMatch} />
      <Route path=":productName" component={Product} />
    </Route>
    <Route path="order">
      <Route path="list" component={OrderList} />
      <Route path="comfirm" component={OrderComfirm} />
    </Route>
    <Route path="*" component={NoMatch} />
  </Route>
)