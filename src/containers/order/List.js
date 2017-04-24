import moment from 'moment'
import React, { Component } from 'react'
import { Link } from 'react-router'
import { Row, Col, Table, Popconfirm, Collapse, Modal } from 'antd'

import './List.less'
import { LANG, FAQ } from '../../locales/'
import { ReduxHelper } from '../../helpers/'
import { Base64 } from '../../utils/encode'
import ConfirmModal from './components/ConfirmModal'

const ENUM_STATE = {
  '0': LANG.order_state_0,
  '1': LANG.order_state_1,
  '2': LANG.order_state_2,
  '3': LANG.order_state_3,
  '8': LANG.order_state_8,
  '9': LANG.order_state_9,
  '-1': LANG.order_state_x1,
  '-2': LANG.order_state_x2
}

const Panel = Collapse.Panel

class List extends Component {

  state = {
    showConfirmModal: false,
    refundId: ''
  }

  componentDidMount() {
    const { getUserOrders, getInvoiceMailto } = this.props.actions.order
    getUserOrders()
    getInvoiceMailto()
  }

  logout = (event) => {
    event.preventDefault()
    const { logout } = this.props.actions.auth
    logout()
  }

  cancel = (order, event) => {
    event.preventDefault()
    const { cancelOrder } = this.props.actions.order
    cancelOrder({
      id: order.id
    })
  }

  refund = (reason) => {
    const { refundOrder } = this.props.actions.order
    refundOrder({
      id: this.state.refundId,
      reason: reason
    })
  }

  onRefundClick = (id, event) => {
    this.setState({
      refundId: id,
      showConfirmModal: true
    })
  }

  handleConfirmModalCancel = (e) => {
    console.log(e.tr)
    this.setState({
      showConfirmModal: false
    })
  }

  handleConfirmModalOk = (reason) => {
    this.setState({
      showConfirmModal: false
    }, () => {
      this.refund(reason)
    })
  }

  handleInvoiceGet = (orderNumber, event) => {    
    event.preventDefault()
    const { order_mailto } = this.props.reducer.order
    let mailto = ''
    if(order_mailto){
      mailto = order_mailto.replace(/x_orderNumber/g,orderNumber)      
    }
    Modal.info({
      title: LANG.list_modal_get_invoice_title,
      content: (
        <div>
          <p>{LANG.list_modal_get_invoice_content_desc}
          <br/>
          <a className="order-action" style={{
            color: 'rgba(16, 142, 233, 0.63)'
          }} href={mailto} >{LANG.list_modal_get_invoice_content_link}</a></p>
        </div>
      ),
      okText: LANG.list_modal_get_invoice_ok_text,
      onOk() { },
    })
  }

  getOrderActions = (order) => {

    const orderId = Base64.encode(order.id)
    const payNode = order.state === 0 ? (<Link to={`/order/pay/${orderId}`} className="order-action">{LANG.list_table_action_pay_now}</Link>) : null

    const cancelNode = order.state === 0 ? (<Popconfirm title={LANG.list_table_action_cancel_confirm_tip} onConfirm={this.cancel.bind(this, order)} okText={LANG.list_table_action_cancel_confirm_ok} cancelText={LANG.list_table_action_cancel_confirm_cancel}>
      <a href="#" className="order-action">{LANG.list_table_action_cancel}</a>
    </Popconfirm>) : null


    const refundNode = order._order.allow_refund ? (
      <a className="order-action" onClick={this.onRefundClick.bind(this, order.id)}>{LANG.list_table_action_refund}</a>
    ) : null


    const invoiceNode = order._order.allow_request_invoice ? (
      <a className="order-action" onClick={this.handleInvoiceGet.bind(this, order.order_number)}>{LANG.list_table_action_get_invoice}</a>
    ) : null

    return (
      <div>
        {payNode}
        {cancelNode}
        {refundNode}
        {invoiceNode}
      </div>
    )

  }

  render() {
    const { orders } = this.props.reducer.order

    const columns = [
      {
        title: LANG.list_table_column_order_number,
        dataIndex: 'on',
        key: 'on',
        className: 'text-align-center',
        render: (text, record, index) => {
          const orderId = Base64.encode(record.id)
          return (<Link to={`/order/detail/${orderId}`} className="order-link">{record.on}</Link>)
        }
      },
      {
        title: LANG.list_table_column_contact_email,
        dataIndex: 'email',
        key: 'email',
        className: 'text-align-center'
      },
      {
        title: LANG.list_table_column_created_time,
        dataIndex: 'created',
        key: 'created',
        className: 'text-align-center'
      },
      {
        title: LANG.list_table_column_state,
        dataIndex: 'state',
        key: 'state',
        className: 'text-align-center',
        render: (text, record, index) => {
          const str = ENUM_STATE[text]
          return (<div>{str}</div>)
        }
      },
      {
        // title: 'Action',
        dataIndex: 'action',
        key: 'action',
        className: 'text-align-center',
        render: (text, record, index) => {
          return this.getOrderActions(record)
        }
      }
    ]

    let dataSource = []
    if (Array.isArray(orders) && orders.length > 0) {
      let sortedOrder = orders.sort((a, b) =>
        b.create_time - a.create_time
      )

      dataSource = sortedOrder.map((item, key) => {
        return {
          key: item.id,
          id: item.id,
          account: item.account,
          email: item.contact_email || 'none',
          on: item.order_number,
          created: moment(item.create_time).format("YYYY/MM/DD hh:mm:ss"),
          state: item.state,
          payment: item.pay_type,
          action: item.state,
          order_number: item.order_number,
          _order: item
        }
      })
    }

    return (
      <div className="list">

        <ConfirmModal {...{ visible: this.state.showConfirmModal, handleOk: this.handleConfirmModalOk, handleCancel: this.handleConfirmModalCancel }} />

        <div className="breadcrumb">
          <div className="container links">
            <h2>{LANG.breadcrumb_my_orders}</h2>
          </div>
        </div>

        <Row className="container detail">
          <Col span={24} className="info">
            <Table pagination={false}
              columns={columns}
              bordered={true}
              dataSource={dataSource}
            />
          </Col>

          <Col span={24} className="faq">

            <h2>{LANG.order_list_faq_title}</h2>

            <Collapse bordered={false}>
              {
                FAQ.map((v, k) =>
                  <Panel header={(k + 1) + '. ' + v.q} key={k}>
                    <p dangerouslySetInnerHTML={{ __html: v.a }} />
                  </Panel>
                )
              }
            </Collapse>
          </Col>
        </Row >
      </div>

    )
  }
}

export default ReduxHelper(List)
