import React, { Component } from 'react'
import { Row, Col, Radio, Button, Carousel, Spin, InputNumber, message } from 'antd'

import './Detail.less'
import lang from '../../language/'
import { Loading } from '../../components/'
import IC_CAR from '../../assets/icons/ic_car@2x.png'
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
    const { getProBatch } = this.props.actions.order
    const { productName } = this.props.params

    fetchProduct(productName)
    getProBatch()
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
      message.info(lang.product_detail_message_add_cart)
    }
  }


  render() {
    const { product } = this.props.reducer
    const { delivery_info } = this.props.reducer.order
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
    const features = detail.info.features
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
                <p><span>{lang.product_detail_meta_package_span}</span>{commodity.info.description}</p>
              </div>

              <Row className="price">
                <Col span={12}>
                  {lang.product_detail_meta_price}:
                </Col>
                <Col span={12} style={{ fontWeight: "bold" }}>
                  {currency} {amount} {/*this.state.count*/}
                </Col>
              </Row>

              <Row className="count">
                <Col span={12}>
                  {lang.product_detail_meta_quantity}:
                </Col>
                <Col span={12}>
                  <InputNumber size="large" min={1} max={5} defaultValue={this.state.count} onChange={this.onCountChange} />
                </Col>
              </Row>

              <Row className="specs">
                {
                  features.map((obj, key) =>
                    <Col md={12} key={key}>
                      <Row className="feature-block" type="flex" align="middle">
                        <Col span={6}><img src={obj.icon} alt="" style={{ width: '40px', display: 'block' }} /></Col>
                        <Col span={18}><p>{obj.desc}</p></Col>
                      </Row>
                    </Col>
                  )
                }
              </Row>

              <Row className="notice">
                <Col span={24}>
                  <p><img className="car" src={IC_CAR} alt="" />{lang.confirm_meta_delivery} {delivery_info.deliveryTime}, {lang.confirm_meta_batch} {delivery_info.batch}</p>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}><Button type="primary" className="btn-next" onClick={this.onSubmit.bind(this, '')}>{lang.product_detail_btn_add_to_cart}</Button></Col>
                <Col span={12}><Button type="primary" className="btn-next" onClick={this.onSubmit.bind(this, 'once')}>{lang.product_detail_btn_buy_now}</Button></Col>
              </Row>

            </Col>

          </Row>

        </Col>

      </Row>
    )

  }
}

export default ReduxHelper(Detail)