import React, { Component } from 'react'
import { Row, Col, Form, Input, Button, Icon } from 'antd'

const FormItem = Form.Item

class Login extends Component {

  constructor(props) {
    super(props)
    this.state = {
      confirmDirty: false
    }
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
                  type: 'email', message: '邮箱不合法!',
                }, {
                  required: true, message: '请输入您的邮箱!',
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
                  required: true, message: '请输入密码!',
                }, {
                  validator: this.checkConfirm,
                }],
              })(
                <Input type="password" prefix={<Icon type="lock" />} placeholder="password" />
                )}
            </FormItem>
          </Col>


          {/* Captcha */}
          <Col span={24}>
            <FormItem>
              <Row>
                <Col span={12}>
                  {
                    getFieldDecorator('captcha', {
                      rules: [{ required: true, message: '请输入验证码' }],
                    })(
                      <Input placeholder="验证码" prefix={<Icon type="message" />} />
                      )
                  }
                </Col>
                <Col span={10} offset={2}>
                  <Button size="large" style={{ width: '100%' }}>获取验证码</Button>
                </Col>
              </Row>
            </FormItem>
          </Col>

          {/* Submit */}
          <Col span={24}>
            <FormItem >
              <Button type="primary" htmlType="submit" size="large" style={{ width: '100%', height: '48px' }}>登录</Button>
            </FormItem>
          </Col>

        </Row>

      </Form>
    )
  }
}

export default Form.create()(Login)