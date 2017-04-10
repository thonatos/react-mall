import React, { Component } from 'react'
import { Input } from 'antd'

const language = {
  "NOTE_DESC": "If you have any other question, please leave it in the box.",  
}

class Note extends Component {

  state = {    
    note: ''
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
      note: value
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
          <p>{language.NOTE_DESC}</p>
          <div>
            <Input type="textarea" autosize={{ minRows: 2, maxRows: 6 }}  onBlur={this.onBlur} placeholder="Your notes" />
          </div>
        </div>
      </div>
    )
  }
}

export default Note