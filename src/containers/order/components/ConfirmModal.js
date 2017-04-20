import React, { Component } from 'react'
import { Input, Modal } from 'antd'
import { LANG } from '../../../locales/'

class ConfirmModal extends Component {

  state = {
    reason: ''
  }

  handleModalOk = (e) => {
    const { handleOk } = this.props


    if (this.state.reason === '') {
      this.setState({
        errMsg: LANG.c_refund_modal_err_msg
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
        title={LANG.c_refund_modal_title}
        visible={visible}
        onOk={this.handleModalOk}
        onCancel={handleCancel}
        okText={LANG.c_refund_modal_ok_text}
        cancelText={LANG.c_refund_modal_cancel_text}
      >
        <div>
          <p>{LANG.c_refund_modal_tips}</p>
          <Input onBlur={this.onBlur} ref="reason" type="textarea" autosize={{ minRows: 2, maxRows: 6 }} />
          {
            this.state.errMsg ? (<span style={{ color: 'red' }}>{this.state.errMsg}</span>) : ('')
          }
        </div>
      </Modal>
    )
  }
}

export default ConfirmModal