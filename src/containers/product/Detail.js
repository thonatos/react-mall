import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as orderActions from '../../actions/order'
import * as productActions from '../../actions/product'

import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'
import { Row, Col, Radio, Button, Carousel, Spin } from 'antd'
import { Loading } from '../../components/'

import './Detail.less'

const RadioButton = Radio.Button
const RadioGroup = Radio.Group

import IC_CAR from '../../assets/icons/ic_car@2x.png'
import IC_XIANGOU from '../../assets/icons/ic_xiangou@2x.png'

import LANGUAGE from '../../language/'

class Detail extends Component {

  static propTypes = {
    loading: PropTypes.bool,
    product: PropTypes.object
  }

  state = {
    suit: 0
  }

  componentDidMount() {
    const { fetchProduct } = this.props
    const { productName } = this.props.params
    fetchProduct(productName)
  }

  onChange = (e) => {
    this.setState({
      suit: e.target.value,
    })
  }

  onSubmit = (e) => {
    const { router, product, updateCart } = this.props
    let cart = Object.assign({}, {
      product: product,
      commodity: product.commodities[this.state.suit]
    })
    updateCart(cart)
    router.push('/order/confirm')
  }

  getLinks = (auth) => {
    if (auth.isLoggedIn) {
      return (
        <div className="container links">
          <Link to="/order/list">My Account</Link>
        </div>
      )
    } else {
      return (
        <div className="container links">
          <Link to="/user/register">Register</Link>
          <Link to="/user/login">Log in</Link>
        </div>
      )
    }
  }

  render() {
    const { product, loading, auth } = this.props    
    if (loading) {
      return (
        <Spin spinning={loading}>
          <Loading />
        </Spin>
      )
    }

    const settings = {
      customPaging: function (i) {
        return <img src={product.displays[i].preview} alt={i} />
      },
      dotsClass: 'slick-thumb',
      infinite: true,
      speed: 500
    }

    const links = this.getLinks(auth)

    return (
      <Row className="product" type="flex" align="top">

        <Col md={24} className="breadcrumb">
          {links}
        </Col>

        <Col md={24} className="container detail">
          <Col md={12} className="carousel">
            <Carousel autoplay effect="fade" {...settings}>
              {
                product.displays.map((obj, key) =>
                  <div key={key} className="carousel-item">
                    <img src={obj.url} alt={key} />
                  </div>
                )
              }
            </Carousel>
          </Col>

          <Col md={8} offset={4} className="info">
            <div className="">
              <h2 className="title">{product.info.name}</h2>
              <p className="desc">{LANGUAGE.PRODUCT_PRO_DESC}</p>

              <div className="suits">
                <RadioGroup onChange={this.onChange} value={this.state.suit} className="suits-radio-group">
                  {
                    product.commodities.map((obj, key) =>
                      <RadioButton key={key} value={key}>{obj.name}</RadioButton>
                    )
                  }
                </RadioGroup>
              </div>

              <div className="specs">
                {
                  product.info.features.map((obj, key) =>
                    <Col md={12} key={key}>
                      <p>{obj}</p>
                    </Col>
                  )
                }
              </div>

              <Button type="primary" className="btn-next" onClick={this.onSubmit}>{LANGUAGE.INFO_BTN_BUY_NOW}</Button>

              <div className="notice">
                <p><img className="car" src={IC_CAR} alt="" />{LANGUAGE.INFO_TIPS_DELIVERY_TIME}</p>
                <p><img className="xiangou" src={IC_XIANGOU} alt="" />{LANGUAGE.INFO_TIPS_ORDER_LIMITION}</p>
              </div>
            </div>
          </Col>
        </Col>

      </Row>
    )

  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    product: state.product.data,
    loading: state.product.loading
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...productActions,
    updateCart: orderActions.updateCart
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail)