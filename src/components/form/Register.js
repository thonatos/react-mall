import React, { Component } from 'react'
import { Row, Col, Form, Input, Button, Icon, Checkbox } from 'antd'
import { LANG } from '../../locales/'

const FormItem = Form.Item

class Register extends Component {

  state = {
    confirmDirty: false,
    agree: false
  }

  onAgreeChange = (e) => {
    console.log(e.target.checked)

    this.setState({
      agree: e.target.checked
    })
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
        this.props.register(values)
      }
    })
  }

  // handleGetCaptcha = (e) => {
  //   e.preventDefault()
  //   this.props.form.validateFields(['email'], (err, values) => {
  //     if (values.email) {
  //       this.props.getCaptcha({ type: 'forgetAccountPassword', ...values })
  //     }
  //   })
  // }

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

          {/*
          <Col span={24}>
            <FormItem>
              <Row>
                <Col span={12}>
                  {
                    getFieldDecorator('code', {
                      rules: [{ required: true, message: 'Please input your captcha' }],
                    })(
                      <Input placeholder="captcha" prefix={<Icon type="message" />} />
                      )
                  }
                </Col>
                <Col span={10} offset={2}>
                  <Button style={{ width: '100%' }} onClick={this.handleGetCaptcha}>GET CAPTCHA</Button>
                </Col>
              </Row>
            </FormItem>
          </Col>        
          */}

          <Col span={24} className="agreement">
            <Checkbox onChange={this.onAgreeChange}>{LANG.c_auth_form_agreement_checkbox_msg}</Checkbox>

            <p className="tips">{LANG.c_auth_form_agreement_link_tips} <a href="/page/privacy" target="_blank">{LANG.c_auth_form_agreement_link_desc}</a>
            </p>

          </Col>
          {/* Submit */}
          <Col span={24}>
            <FormItem>
              <Button type="primary" htmlType="submit" size="large" style={{ width: '100%', height: '48px' }} disabled={this.state.agree ? '' : 'disabled'}>{LANG.c_auth_btn_register}</Button>
            </FormItem>
          </Col>

        </Row>

      </Form>
    )
  }
}

export default Form.create()(Register)