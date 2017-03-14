import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './App'

import { NoMatch, Home } from './containers'

import OrderList from './containers/order/List'
import OrderInfo from './containers/order/Info'

import UserLogin from './containers/user/Login'
import UserRegister from './containers/user/Register'

import ProductDetail from './containers/product/Detail'

export default (
  <Route path="/" component={App}>
  
    <IndexRoute component={Home} />
    
    <Route path="user">
      <IndexRoute component={NoMatch} />
      <Route path="login" component={UserLogin} />    
      <Route path="register" component={UserRegister} />        
    </Route>    

    <Route path="product">
      <IndexRoute component={NoMatch} />
      <Route path=":productName" component={ProductDetail} />
    </Route>

    <Route path="order">
      <Route path="list" component={OrderList} />
      <Route path="info" component={OrderInfo} />
    </Route>
    <Route path="*" component={NoMatch} />
  </Route>
)