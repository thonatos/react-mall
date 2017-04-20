import React, { Component } from 'react'
import { Input, Checkbox } from 'antd'
import { LANG } from '../../../locales/'

function emailValid(email) {
  var reg = /([\w\.]+)@([\w\.]+)\.(\w+)/g
  return reg.test(email)
}

class Contact extends Component {

  state = {
    contact_email: '',
    subscribe: true,
    errMsg: ''
  }

  componentWillReceiveProps(nextProps) {
    const { defaultEmail } = nextProps.data
    if (defaultEmail !== '') {
      this.setState({
        contact_email: defaultEmail
      })
    }
  }

  onBlur = (e) => {
    const { handleInputChange } = this.props
    const value = e.target.value
    this.setState({
      contact_email: value
    }, () => {
      if (emailValid(value)) {
        this.setState({
          errMsg: ''
        })
        if (handleInputChange) {
          handleInputChange('contact_email', this.state.contact_email)
        }
      } else {
        this.setState({
          errMsg: LANG.c_contact_input_mail_invalid
        })
      }
    })
  }

  handleChange = (event) => {
    this.setState({ contact_email: event.target.value })
  }

  onChange = (e) => {
    const { handleInputChange } = this.props
    const checked = e.target.checked

    this.setState({
      subscribe: checked
    }, () => {
      if (handleInputChange) {
        handleInputChange('subscribe', this.state.subscribe)
      }
    })
  }

  render() {

    return (

      <div className="section">
        <div className="header">
          <h3>{LANG.c_contact_title}</h3>
        </div>
        <div className="contact">
          <p>{LANG.c_contact_tips}</p>
          <div>
            <Input value={this.state.contact_email} onBlur={this.onBlur} onChange={this.handleChange} placeholder={LANG.c_contact_input_mail_placeholder} />
            {
              this.state.errMsg ? (<span style={{ color: 'red' }}>{this.state.errMsg}</span>) : ('')
            }
          </div>
          <div>
            <Checkbox onChange={this.onChange} checked={this.state.subscribe}>{LANG.c_contact_checkbox_subscribe_desc}</Checkbox>
          </div>
        </div>
      </div>
    )
  }
}

export default Contact