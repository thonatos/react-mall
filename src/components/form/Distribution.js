import React, { Component } from 'react'
import { Row, Col, Form, Input, Cascader, Button } from 'antd'

const FormItem = Form.Item

const cities = [{
  value: 'zhejiang',
  label: 'Zhejiang',
  children: [{
    value: 'hangzhou',
    label: 'Hangzhou',
    children: [{
      value: 'xihu',
      label: 'West Lake',
    }],
  }],
}, {
  value: 'jiangsu',
  label: 'Jiangsu',
  children: [{
    value: 'nanjing',
    label: 'Nanjing',
    children: [{
      value: 'zhonghuamen',
      label: 'Zhong Hua Men',
    }],
  }],
}]

class Distribution extends Component {

  componentDidMount() {
    this.props.form.validateFields()
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {       
        console.log('Received values of form: ', values)
        this.props.handleResult(values)        
      }
    })
  }

  handleReset = () => {
    this.props.form.resetFields()
  }

  render() {

    const { getFieldDecorator } = this.props.form

    return (
      <Form onSubmit={this.handleSubmit}>

        <Row type="flex" align="top">
          {/* Name */}
          <Col span={24}>
            <FormItem label="Name">
              {
                getFieldDecorator('name', {
                  rules: [{ required: true, message: 'Please input your name!' }],
                })(
                  <Input placeholder="Name" />
                  )
              }
            </FormItem>
          </Col>

          {/* PhoneNumber */}
          <Col span={24}>
            <FormItem label="Phone Number">
              {getFieldDecorator('phone', {
                rules: [{required: true, message: 'Please input your phone number!' }],
              })(
                <Input placeholder="Phone Number" />
                )}
            </FormItem>
          </Col>

          {/* City */}
          <Col span={24}>
            <FormItem label="City">
              {getFieldDecorator('city', {
                initialValue: ['zhejiang', 'hangzhou', 'xihu'],
                rules: [{ type: 'array', required: true, message: 'Please select your habitual residence!' }],
              })(
                <Cascader options={cities} />
                )}
            </FormItem>
          </Col>

          {/* Address */}
          <Col span={24}>
            <FormItem label="Address">
              {
                getFieldDecorator('address', {
                  rules: [{ required: true, message: 'Please input your address detail!' }],
                })(
                  <Input placeholder="Address Detail" />
                  )
              }
            </FormItem>
          </Col>

          {/* ZipCode */}
          <Col span={24}>
            <FormItem label="Zip Code">
              {
                getFieldDecorator('zip', {
                  rules: [{ required: true, message: 'Please input your zip code!' }],
                })(
                  <Input placeholder="Zip Code" />
                  )
              }
            </FormItem>
          </Col>

          {/* Submit */}
          <Col span={24}>
            <FormItem >
              <Button type="primary" htmlType="submit" size="large">Save</Button>
              <Button type="primary" onClick={this.handleReset} style={{ marginLeft: '1em' }}>Clear</Button>
            </FormItem>
          </Col>

        </Row>

      </Form>
    )
  }
}

export default Form.create()(Distribution)