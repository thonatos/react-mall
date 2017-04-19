import React, { Component } from 'react'
import { Input } from 'antd'
import lang from '../../../language/'

function emailValid(email) {
  var reg = /([\w\.]+)@([\w\.]+)\.(\w+)/g
  return reg.test(email)
}

class Additional extends Component {

  state = {
    backup_email: '',
    backup_phone: '',
    errMsg: ''
  }

  onEmailBlur = (e) => {
    const { handleInputChange } = this.props
    const value = e.target.value

    if (value === '') {
      this.setState({
        errMsg: ''
      })
      return
    }

    this.setState({
      backup_email: value
    }, () => {
      if (emailValid(value)) {
        this.setState({
          errMsg: ''
        })

        if (handleInputChange) {
          handleInputChange('backup_email', this.state.backup_email)
        }

      } else {
        this.setState({
          errMsg: lang.c_contact_input_mail_invalid
        })
      }


    })
  }

  handleEmailChange = (event) => {
    this.setState({ backup_email: event.target.value })
  }

  onPhoneBlur = (e) => {
    const { handleInputChange } = this.props
    const value = e.target.value
    this.setState({
      backup_phone: value
    }, () => {
      if (handleInputChange) {
        handleInputChange('backup_phone', this.state.backup_phone)
      }
    })
  }

  render() {

    return (
      <div className="section">
        <div className="header">
          <h3>{lang.c_contact_add_title}</h3>
        </div>
        <div className="contact">
          <p>{lang.c_contact_add_tips}</p>
          <div>
            <Input onBlur={this.onEmailBlur} onChange={this.handleEmailChange} value={this.state.backup_email} placeholder={lang.c_contact_add_input_mail_placeholder} />
            {
              this.state.errMsg ? (<span style={{ color: 'red' }}>{this.state.errMsg}</span>) : ('')
            }
          </div>
          <div>
            <Input onBlur={this.onPhoneBlur} placeholder={lang.c_contact_add_input_phone_placeholder} />
          </div>
        </div>
      </div>
    )
  }
}

export default Additional