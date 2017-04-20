import React, { Component } from 'react'
import { Row, Col, Form, Input, Button, Icon } from 'antd'
import { LANG } from '../../locales/'

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
      <Form onSubmit={this.handleSubmit} className="auth-form">
        <Row type="flex" align="top">

          {/* Email */}
          <Col span={24}>
            <FormItem label={LANG.c_auth_form_email_label}>
              {getFieldDecorator('email', {
                rules: [{
                  type: 'email', message: LANG.c_auth_form_email_error_msg,
                }, {
                  required: true, message: LANG.c_auth_form_email_msg,
                }],
              })(
                <Input prefix={<Icon type="mail" />} placeholder={LANG.c_auth_form_email_placeholder} />
                )}
            </FormItem>
          </Col>

          {/* Password */}
          <Col span={24}>
            <FormItem label={LANG.c_auth_form_passwd_label}>
              {getFieldDecorator('password', {
                rules: [{
                  required: true, message: LANG.c_auth_form_passwd_msg,
                }],
              })(
                <Input type="password" prefix={<Icon type="lock" />} placeholder={LANG.c_auth_form_passwd_placeholder} />
                )}
            </FormItem>
          </Col>

          {/* Submit */}
          <Col span={24}>
            <FormItem >
              <Button type="primary" htmlType="submit" size="large" style={{ width: '100%', height: '48px' }}>{LANG.c_auth_btn_login}</Button>
            </FormItem>
          </Col>

        </Row>

      </Form>
    )
  }
}

export default Form.create()(Login)