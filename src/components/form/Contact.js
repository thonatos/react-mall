import React, { Component } from 'react'
import { Row, Col, Input } from 'antd'


class Contact extends Component {

  onPressEnter = (e) => {
    e.preventDefault()
    console.log(e.target.value)
  }

  render() {    
    return (
      <Row className="contact" type="flex" align="top">
        <Col span={8} style={{
          margin: '1em 0'
        }}>          
          <Input onPressEnter={this.onPressEnter} placeholder="Please input your email" />
        </Col>
      </Row>
    )
  }
}

export default Contact