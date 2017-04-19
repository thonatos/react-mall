import React, { Component } from 'react'
import { Input, Modal } from 'antd'
import lang from '../../../language/'

class ConfirmModal extends Component {

  state = {
    reason: ''
  }

  handleModalOk = (e) => {
    const { handleOk } = this.props


    if (this.state.reason === '') {
      this.setState({
        errMsg: lang.c_refund_modal_err_msg
      })
    } else {
      this.setState({
        errMsg: '',
        reason: ''
      }, () => {
        if (handleOk) {
          handleOk(this.state.reason)
          this.refs.reason.refs.input.value = ''
        }
      })
    }
  }

  onBlur = (e) => {
    const value = e.target.value
    this.setState({
      reason: value
    })
  }

  render() {
    const { visible, handleCancel } = this.props
    return (
      <Modal
        title={lang.c_refund_modal_title}
        visible={visible}
        onOk={this.handleModalOk}
        onCancel={handleCancel}
        okText={lang.c_refund_modal_ok_text}
        cancelText={lang.c_refund_modal_cancel_text}
      >
        <div>
          <p>{lang.c_refund_modal_tips}</p>
          <Input onBlur={this.onBlur} ref="reason" type="textarea" autosize={true} />
          {
            this.state.errMsg ? (<span style={{ color: 'red' }}>{this.state.errMsg}</span>) : ('')
          }
        </div>
      </Modal>
    )
  }
}

export default ConfirmModal