import React, { Component } from 'react'
import { Modal, Button, Collapse } from 'antd'
const Panel = Collapse.Panel


class PayModal extends Component {

  handleOk = (e) => {
    const { router } = this.props
    router.push('/order/list')
  }

  handleCancel = (e) => {
    const { router } = this.props
    router.push('/order/list')
  }

  render() {
    const { visible, payChannels, order } = this.props

    const text = `
      A dog is a type of domesticated animal.
      Known for its loyalty and faithfulness,
      it can be found as a welcome guest in many households across the world.
    `;

    const baseUrl = order.pagePayments + order.id || ''

    return (
      <Modal
        title="支付订单"
        visible={visible}
        okText="支付完成"
        cancelText="返回主页"
        onOk={this.handleOk}
        onCancel={this.handleCancel}
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
            <Panel header="支付相关问题" key="1">
              <p>{text}</p>
            </Panel>
          </Collapse>
        </div>

      </Modal>
    )
  }
}

export default PayModal