import React, { Component } from 'react'
import { Radio } from 'antd'

const RadioButton = Radio.Button
const RadioGroup = Radio.Group


class RadioContainer extends Component {

  state = {
    value: 0
  }


  onChange = (e) => {
    const { submitType, handleRadioChange, data } = this.props
    this.setState({
      value: e.target.value,
    }, () => {
      if (handleRadioChange) {
        console.log(submitType, data[this.state.value])
        handleRadioChange(submitType, data[this.state.value])
      }
    })
  }

  render() {

    const { title, data } = this.props
    let radioNodes = (<div></div>)

    if (data) {
      radioNodes = data.map((obj, key) =>
        <RadioButton value={key} key={key}>{obj.name}</RadioButton>
      )
    } else {
      radioNodes = (<RadioButton value='none' disabled>none</RadioButton>)
    }

    return (
      <div className="section">
        <div className="header">
          <h3>{title}</h3>
        </div>
        <RadioGroup onChange={this.onChange} className="radio-container">
          {radioNodes}
        </RadioGroup>
      </div>
    )
  }
}

export default RadioContainer