import React, { Component } from 'react'
import { Modal, Button } from 'antd'


class PayModal extends Component {

  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    const { visible } = nextProps
    this.setState({
      visible: visible
    })
  }

  // list payments

  // triger action

  // Modal
  showModal = () => {
    this.setState({
      visible: true,
    })
  }

  handleOk = (e) => {
    console.log(e)
    this.handleSubmit(e)
    this.setState({
      visible: false,
    })
  }

  handleCancel = (e) => {
    this.setState({
      visible: false,
    })
  }

  render() {
    const { data, visible } = this.props
    return (
      <Modal
        title="支付订单"
        visible={this.state.visible}
        okText="保存"
        cancelText="取消"
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >

        <ul>
          <li>a</li>
          <li>2</li>
        </ul>
        <div>支付完成，支付遇到问题</div>

        {data}
      </Modal>
    )
  }
}

export default PayModal