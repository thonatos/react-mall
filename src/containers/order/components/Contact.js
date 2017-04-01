import React, { Component } from 'react'
import { Input, Checkbox } from 'antd'

const language = {
  "CONTACT_DESC": "It’s important that you leave your email address, as well send your order confirmation as well as delivery updates to this address.",
  "CONTACT_RECEIVE": "Receive the latest news about Insta360 products, service and software updates."

}

class Contact extends Component {

  state = {
    email: '',
    subscribe: false
  }

  handle = () => {
    const { submitType, handleInputChange } = this.props
    if (handleInputChange) {
      handleInputChange(submitType, {
        email: this.state.email,
        subscribe: this.state.subscribe
      })
    }
  }

  onBlur = (e) => {
    const { submitType, handleInputChange } = this.props
    const value = e.target.value
    this.setState({
      email: value
    }, () => {
      if (handleInputChange) {
        handleInputChange(submitType, this.state)
      }
    })
  }

  onChange = (e) => {
    const { submitType, handleInputChange } = this.props
    const checked = e.target.checked

    this.setState({
      subscribe: checked
    }, () => {
      if (handleInputChange) {
        handleInputChange(submitType, this.state)
      }
    })
  }

  render() {
    const { title } = this.props

    return (

      <div className="section">
        <div className="header">
          <h3>{title}</h3>
        </div>
        <div className="contact">
          <p>{language.CONTACT_DESC}</p>
          <div>
            <Input onBlur={this.onBlur} placeholder="example@domain.com" />
          </div>
          <div>
            <Checkbox onChange={this.onChange}>{language.CONTACT_RECEIVE}</Checkbox>
          </div>
        </div>
      </div>
    )
  }
}

export default Contact