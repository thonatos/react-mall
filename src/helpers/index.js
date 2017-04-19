import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as orderActions from '../actions/order'
import * as authActions from '../actions/auth'
import * as productActions from '../actions/product'


exports.ReduxHelper = function (component) {
  function mapStateToProps(state) {
    return {
      reducer: {
        order: state.order,
        auth: state.auth,
        product: state.product
      }
    }
  }

  function mapDispatchToProps(dispatch) {
    // return { actions: bindActionCreators(orderActions, dispatch) }

    return {
      actions: {
        product: bindActionCreators(productActions, dispatch),
        order: bindActionCreators(orderActions, dispatch),
        auth: bindActionCreators(authActions, dispatch)
      }
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(component)
}