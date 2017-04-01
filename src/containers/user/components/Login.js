import React, { Component } from 'react'
import { Row, Col, Form, Input, Button, Icon } from 'antd'

const FormItem = Form.Item

class Login extends Component {

  state = {
    confirmDirty: false
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.handleLogin(values)
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form onSubmit={this.handleSubmit} style={{ marginTop: '2em' }}>
        <Row type="flex" align="top">

          {/* Email */}
          <Col span={24}>
            <FormItem>
              {getFieldDecorator('email', {
                rules: [{
                  type: 'email', message: 'Invalid Email Address!',
                }, {
                  required: true, message: 'Please input your email address!',
                }],
              })(
                <Input prefix={<Icon type="mail" />} placeholder="email" />
                )}
            </FormItem>
          </Col>

          {/* Password */}
          <Col span={24}>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{
                  required: true, message: 'Please input your password!',
                }, {
                  validator: this.checkConfirm,
                }],
              })(
                <Input type="password" prefix={<Icon type="lock" />} placeholder="password" />
                )}
            </FormItem>
          </Col>

          {/* Submit */}
          <Col span={24}>
            <FormItem >
              <Button type="primary" htmlType="submit" size="large" style={{ width: '100%', height: '48px' }}>LOG IN</Button>
            </FormItem>
          </Col>

        </Row>

      </Form>
    )
  }
}

export default Form.create()(Login)