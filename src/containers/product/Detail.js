import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import React, { Component } from 'react'
import { Row, Col, Radio, Button, Carousel } from 'antd'
import './Detail.less'

const RadioButton = Radio.Button
const RadioGroup = Radio.Group


import { products } from '../data'

class Detail extends Component {

  constructor(props) {
    super(props)
    this.state = {
      suit: 0
    }
  }

  onChange = (e) => {
    console.log('radio checked', e.target.value);
    this.setState({
      suit: e.target.value,
    });
  }

  render() {

    const { productName } = this.props.params
    const product = products[productName]

    const suits = products[productName].suits
    const suit = product.suits[this.state.suit]
    const thumb = product.thumb

    return (
      <Row className="container product-detail" type="flex" align="top">

        <Col md={12} style={{ textAlign: 'center' }}>
          <Carousel autoplay effect="fade">
            {
              thumb.map((obj, key) =>
                <div key={key}>
                  <img src={obj} alt="" style={{ textAlign: 'center', 'width': '388px', 'margin': '0 auto' }} />
                </div>
              )
            }
          </Carousel>
        </Col>

        <Col md={8} offset={4}>
          <div className="detail">
            <h2>{product.name}</h2>
            <p>Price: {suit.price}</p>

            <div className="suits">
              <RadioGroup onChange={this.onChange} value={this.state.suit} className="suits-radio-group">
                {
                  suits.map((obj, key) =>
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

            <Button type="primary" className="btn-next">Next</Button>
          </div>
        </Col>
      </Row>
    )
  }
}

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail)