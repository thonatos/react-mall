import React, { Component } from 'react'
import { Row, Col, Form, Input, Button, Icon } from 'antd'
import { LANG } from '../../locales/'

const FormItem = Form.Item

class Retrieve extends Component {

  constructor(props) {
    super(props)
    this.state = {
      confirmDirty: false
    }
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  checkPassword = (rule, value, callback) => {
    const form = this.props.form
    if (value && value !== form.getFieldValue('password')) {
      callback(LANG.c_auth_form_passwd_confirm_error_msg)
    } else {
      callback()
    }
  }

  checkConfirm = (rule, value, callback) => {
    const form = this.props.form
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true })
    }
    callback()
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.retrieve(values)
      }
    })
  }

  handleGetCaptcha = (e) => {
    e.preventDefault()
    this.props.form.validateFields(['email'], (err, values) => {
      if (values.email) {
        this.props.getCaptcha({ type: 'forgetAccountPassword', ...values })
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
                }, {
                  validator: this.checkConfirm,
                }],
              })(
                <Input type="password" prefix={<Icon type="lock" />} placeholder={LANG.c_auth_form_passwd_placeholder} />
                )}
            </FormItem>
          </Col>

          {/* Confirm Password */}
          <Col span={24}>
            <FormItem label={LANG.c_auth_form_passwd_confirm_label}>
              {getFieldDecorator('confirm', {
                rules: [{
                  required: true, message: LANG.c_auth_form_passwd_confirm_msg,
                }, {
                  validator: this.checkPassword,
                }],
              })(
                <Input type="password" onBlur={this.handleConfirmBlur} prefix={<Icon type="lock" />} placeholder={LANG.c_auth_form_passwd_confirm_placeholder} />
                )}
            </FormItem>
          </Col>

          {/* Captcha */}
          <Col span={24}>

            <Row gutter="16">
              <Col span={12}>
                <FormItem label={LANG.c_auth_form_captcha_label}>
                  {
                    getFieldDecorator('code', {
                      rules: [{ required: true, message: LANG.c_auth_form_code_msg }],
                    })(
                      <Input placeholder="captcha" prefix={<Icon type="message" />} />
                      )
                  }
                </FormItem>
              </Col>
              <Col span={12}>
                <Button style={{ width: '100%', marginTop: '33px' }} onClick={this.handleGetCaptcha}>{LANG.c_auth_btn_captcha}</Button>
              </Col>
            </Row>
          </Col>

          {/* Submit */}
          <Col span={24}>
            <FormItem >
              <Button type="primary" htmlType="submit" size="large" style={{ width: '100%', height: '48px' }}>{LANG.c_auth_btn_retrieve}</Button>
            </FormItem>
          </Col>

        </Row>

      </Form>
    )
  }
}

export default Form.create()(Retrieve)