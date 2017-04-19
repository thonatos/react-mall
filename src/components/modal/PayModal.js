import React, { Component } from 'react'
import { Modal, Button, Collapse } from 'antd'
const Panel = Collapse.Panel


class PayModal extends Component {

  handleOk = (e) => {
    const { handlePayModalCallback } = this.props
    handlePayModalCallback('ok')
  }

  handleCancel = (e) => {
    const { handlePayModalCallback } = this.props
    handlePayModalCallback('cancel')
  }

  render() {
    const { payChannels, pagePayments, cart } = this.props.data
    const visible = cart.showPayModal
    const orderId = cart.order.id
    const text = `
      A dog is a type of domesticated animal.
      Known for its loyalty and faithfulness,
      it can be found as a welcome guest in many households across the world.
    `;

    const baseUrl = pagePayments + orderId || ''

    return (
      <Modal
        title="Pay Order"
        visible={visible}
        okText="Done"
        cancelText="Cancel"
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        width={680}
      >

        <div className="payment">
          {
            payChannels.map((obj, key) =>
              <a href={baseUrl + '&channel=' + obj.key} key={key} style={{ marginRight: '1em' }} target="_blank"><Button >{obj.name}</Button></a>
            )
          }
        </div>

        <div className="suggestion" style={{ marginTop: '1em' }}>
          <Collapse bordered={false} defaultActiveKey={['1']}>
            <Panel header="Question" key="1">
              <p>{text}</p>
            </Panel>
            <Panel header="Payments" key="2">
              <p>{text}</p>
            </Panel>
          </Collapse>
        </div>

      </Modal>
    )
  }
}

export default PayModal