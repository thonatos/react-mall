import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import React, { Component } from 'react'
import { Row, Col, Radio, Button } from 'antd'
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

    return (
      <Row className="container product-detail" type="flex" align="top">

        <Col md={12} style={{ textAlign: 'center' }}>
          <img src={product.img} width="388" alt="" />
        </Col>

        <Col md={8} offset={4}>
          <div className="detail">
            <h2>{product.name}</h2>
            <p>Price: {suit.price}</p>

            <div className="suits">
              <RadioGroup onChange={this.onChange} value={this.state.suit} className="suits-radio-group">
                {
                  suits.map((obj, key) =>
                    <RadioButton key={key} value={key}>{obj.goods}</RadioButton>
                  )
                }
              </RadioGroup>
            </div>

            <div className="specs">
              {
                suit.specs.map((obj, key) =>
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