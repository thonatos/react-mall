import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as orderActions from '../../actions/order'
import * as productActions from '../../actions/product'

import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'
import { Row, Col, Radio, Button, Carousel, Spin, InputNumber } from 'antd'
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
    suit: 0,
    count: 1
  }

  componentDidMount() {
    const { fetchProduct } = this.props
    const { productName } = this.props.params
    fetchProduct(productName)
  }

  onCountChange = (v) => {
    this.setState({
      count: v
    })
  }

  onChange = (e) => {
    this.setState({
      suit: e.target.value
    })
  }

  onSubmit = (e) => {
    const { router, product, updateCart } = this.props
    let cart = Object.assign({}, {
      product: product,
      count: this.state.count,
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

    const currency = product.commodities[this.state.suit].price.currency
    const amount = product.commodities[this.state.suit].price.amount

    return (
      <Row className="product">

        <Col md={24} className="breadcrumb">
          {links}
        </Col>

        <Col md={24} className="detail">
          <Row className="container">
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
              <h2 className="title">{product.info.name}</h2>
              <p className="desc">{LANGUAGE.PRODUCT_PRO_DESC}</p>

              <div className="suits">
                <RadioGroup onChange={this.onChange} value={this.state.suit} className="suits-radio-group">
                  {
                    product.commodities.map((obj, key) =>
                      <RadioButton key={key} value={key}>{obj.info.name}</RadioButton>
                    )
                  }
                </RadioGroup>
              </div>

              <Row className="price">
                <Col span={12}>
                  Price:
                    </Col>
                <Col span={12}>
                  {currency} {amount}*{this.state.count}
                </Col>
              </Row>

              <Row className="count">
                <Col span={12}>
                  Count:
                    </Col>
                <Col span={12}>
                  <InputNumber size="large" min={1} max={5} defaultValue={this.state.count} onChange={this.onCountChange} />
                </Col>
              </Row>

              <Row className="specs">
                {
                  product.info.features.map((obj, key) =>
                    <Col md={12} key={key}>
                      <p>{obj}</p>
                    </Col>
                  )
                }
              </Row>

              <Button type="primary" className="btn-next" onClick={this.onSubmit}>{LANGUAGE.INFO_BTN_BUY_NOW}</Button>

              <div className="notice">
                <p><img className="car" src={IC_CAR} alt="" />{LANGUAGE.INFO_TIPS_DELIVERY_TIME}</p>
                <p><img className="xiangou" src={IC_XIANGOU} alt="" />{LANGUAGE.INFO_TIPS_ORDER_LIMITION}</p>
              </div>

            </Col>
          </Row>

        </Col>

      </Row>
    )

  }
}

function mapStateToProps(state) {
  return {
    loading: state.product.loading,
    auth: state.auth,
    product: state.product.data
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...productActions,
    updateCart: orderActions.updateCart
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail)