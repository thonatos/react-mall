import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as orderActions from '../../actions/order'
import * as productActions from '../../actions/product'

import React, { PropTypes, Component } from 'react'
import { Row, Col, Radio, Button, Carousel, Spin } from 'antd'
import { Loading } from '../../components/'

import './Detail.less'

const RadioButton = Radio.Button
const RadioGroup = Radio.Group

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
    router.push('/order/info')
  }

  render() {
    const { product, loading } = this.props

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

    return (
      <Row className="container product-detail" type="flex" align="top">
        <Col md={12} className="carousel">
          <Carousel  effect="fade" {...settings}>
            {
              product.displays.map((obj, key) =>
                <div key={key} className="carousel-item">
                  <img src={obj.url} alt={key} />
                </div>
              )
            }
          </Carousel>
        </Col>

        <Col md={8} offset={4}>
          <div className="detail">
            <h2>{product.info.name}</h2>
            <p>Price: {product.commodities[this.state.suit].price}</p>

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

            <Button type="primary" className="btn-next" onClick={this.onSubmit}>立即购买</Button>

            <div className="notice">
              <p>预计发货时间：3月3日</p>
              <p>每人限购一台，3月3日之前预购可享受早鸟价</p>
            </div>

          </div>
        </Col>
      </Row>
    )

  }
}

function mapStateToProps(state) {
  return {
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