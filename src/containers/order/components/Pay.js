import pingpp from 'pingpp-js'
import React, { Component } from 'react'
import { Modal } from 'antd'


class Pay extends Component {

  state = { visible: false }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  
  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  render() {
    const {data, show} = this.props
    // this.setState({
    //   visible: show
    // })    
    return (
      <Modal title="支付订单" visible={this.state.visible}
        onOk={this.handleOk} onCancel={this.handleCancel}
      >
        {data.msg}
        </Modal>
    )
  }
}

export default Pay