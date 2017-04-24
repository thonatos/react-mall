import React, { Component } from 'react'
import { Row, Col, Radio, Button, Carousel, Spin, InputNumber, message } from 'antd'

import './Detail.less'
import { LANG } from '../../locales/'
import { Loading } from '../../components/'
import { ReduxHelper } from '../../helpers/'

const RadioButton = Radio.Button
const RadioGroup = Radio.Group

message.config({
  top: 100,
  duration: 1
})

class Detail extends Component {

  state = {
    commodity: 0,
    count: 1
  }

  componentDidMount() {
    const { fetchProduct } = this.props.actions.product
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
      commodity: e.target.value
    })
  }

  onSubmit = (items_type, event) => {
    const { addToCart, updateCartItemsType } = this.props.actions.order
    const { updateAuthAction, setRedirect } = this.props.actions.auth

    const { router } = this.props
    const { product, auth } = this.props.reducer
    const { detail } = product
    const commodities = detail.commodities

    let cart = Object.assign({}, {
      product: detail,
      count: this.state.count,
      commodity: commodities[this.state.commodity]
    })

    addToCart(cart, items_type)

    if (items_type === 'once') {

      updateCartItemsType(items_type)

      if (!auth.isLoggedIn) {
        setRedirect('/order/confirm')
        updateAuthAction('login')
      } else {
        router.push('/order/confirm')
      }
    } else {
      message.info(LANG.product_detail_message_add_cart)
    }
  }


  render() {
    const { product } = this.props.reducer
    const { loading, detail } = product

    if (loading) {
      return (
        <Spin spinning={loading}>
          <Loading />
        </Spin>
      )
    }

    const commodity = detail.commodities[this.state.commodity]
    const currency = commodity.price.currency
    const amount = commodity.price.amount

    const info = detail.info
    const displays = detail.displays
    const commodities = detail.commodities

    const settings = {
      customPaging: function (i) {
        return <img src={displays[i].preview} alt={i} />
      },
      dotsClass: 'slick-thumb',
      infinite: true,
      speed: 500
    }


    return (
      <Row className="product">

        <Col md={24} className="detail">

          <Row className="container">

            <Col md={12} className="carousel">
              <Carousel autoplay effect="fade" {...settings}>
                {
                  displays.map((obj, key) =>
                    <div key={key} className="carousel-item">
                      <img src={obj.url} alt={key} />
                    </div>
                  )
                }
              </Carousel>
            </Col>

            <Col md={8} offset={4} className="info">
              <h2 className="title">{info.name}</h2>
              <p className="desc">{info.description}</p>

              <div className="commodities">
                <RadioGroup onChange={this.onChange} value={this.state.commodity} className="commodities-radio-group">
                  {
                    commodities.map((obj, key) =>
                      <RadioButton key={key} value={key}>{obj.info.name}</RadioButton>
                    )
                  }
                </RadioGroup>
              </div>

              <div className="package">
                <h4>{LANG.product_detail_meta_commodity_description}</h4>
                <p className="p-title">{LANG.product_detail_meta_commodity_package}</p>
                <p className="p-items">
                  {
                    commodity.info.package.map((p, key) => {
                      return <span key={key}>{p}</span>
                    })
                  }
                </p>
              </div>

              <Row className="price">
                <Col span={12}>
                  <h4>{LANG.product_detail_meta_price}</h4>
                </Col>
                <Col span={12} style={{ fontWeight: "bold" }}>
                  {currency} {amount}
                </Col>
              </Row>

              <Row className="count">
                <Col span={12}>
                  <h4>{LANG.product_detail_meta_quantity}</h4>
                </Col>
                <Col span={12}>
                  <InputNumber size="large" min={1} max={5} defaultValue={this.state.count} onChange={this.onCountChange} />
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}><Button className="btn-buy" onClick={this.onSubmit.bind(this, '')}>{LANG.product_detail_btn_add_to_cart}</Button></Col>
                <Col span={12}><Button className="btn-buy btn-buy-now" onClick={this.onSubmit.bind(this, 'once')}>{LANG.product_detail_btn_buy_now}</Button></Col>
              </Row>

            </Col>

          </Row>

        </Col>

      </Row>
    )

  }
}

export default ReduxHelper(Detail)