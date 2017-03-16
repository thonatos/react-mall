import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as productActions from '../../actions/product'

import React, { Component } from 'react'
import { Row, Col, Radio, Button, Carousel, Spin } from 'antd'
import { Loading } from '../../components/'

import './Detail.less'

const RadioButton = Radio.Button
const RadioGroup = Radio.Group

class Detail extends Component {

  constructor(props) {
    super(props)
    this.state = {
      suit: 0,
      loading: true
    }
  }

  componentDidMount() {
    const { fetch } = this.props
    const { productName } = this.props.params    
    fetch(productName)
  }

  componentWillReceiveProps(nextProps) {
    if (Object.keys(nextProps.product).length > 0) {
      this.setState({
        loading: false
      })
    }
  }

  onChange = (e) => {
    console.log('radio checked', e.target.value)
    this.setState({
      suit: e.target.value,
    })
  }

  onSubmit = (e) => {
    const { router } = this.props
    router.push('/order/info')
  }

  render() {
    let content
    const { product } = this.props

    console.log(product)

    if (this.state.loading) {
      content = (<Loading />)
    } else {
      content = (
        <Row className="container product-detail" type="flex" align="top">
          <Col md={12} style={{ textAlign: 'center' }}>
            <Carousel autoplay effect="fade">
              {
                product.display.map((obj, key) =>
                  <div key={key}>
                    <img src={obj.url} alt="" style={{ textAlign: 'center', 'width': '388px', 'margin': '0 auto' }} />
                  </div>
                )
              }
            </Carousel>
          </Col>

          <Col md={8} offset={4}>
            <div className="detail">
              <h2>{product.info.name}</h2>
              <p>Price: {product.suits[this.state.suit].price}</p>

              <div className="suits">
                <RadioGroup onChange={this.onChange} value={this.state.suit} className="suits-radio-group">
                  {
                    product.suits.map((obj, key) =>
                      <RadioButton key={key} value={key}>{obj.desc}</RadioButton>
                    )
                  }
                </RadioGroup>
              </div>

              <div className="specs">
                {
                  product.specs.map((obj, key) =>
                    <Col md={12} key={key}>
                      <p>{obj}</p>
                    </Col>
                  )
                }
              </div>

              <Button type="primary" className="btn-next" onClick={this.onSubmit}>Next</Button>
            </div>
          </Col>
        </Row>
      )
    }

    return (
      <Spin spinning={this.state.loading}>
        {content}
      </Spin>
    )
  }
}

function mapStateToProps(state) {
  return {
    product: state.product
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(productActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail)