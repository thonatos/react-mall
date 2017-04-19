import moment from 'moment'
import React, { Component } from 'react'
import { Link } from 'react-router'
import { Row, Col, Table, Popconfirm, Collapse } from 'antd'


import './List.less'
import lang from '../../language/'
import { ReduxHelper } from '../../helpers/'
import { Base64 } from '../../utils/encode'
import ConfirmModal from './components/ConfirmModal'

const ENUM_STATE = {
  '0': lang.order_state_0,
  '1': lang.order_state_1,
  '2': lang.order_state_2,
  '3': lang.order_state_3,
  '8': lang.order_state_8,
  '9': lang.order_state_9,
  '-1': lang.order_state_x1,
  '-2': lang.order_state_x2
}

const Panel = Collapse.Panel

const FAQ = [
  {
    "q": "When will my Insta360 Pro be delivered?",
    "a": "For the delivery time of your Pro, please refer to the \"estimated delivery date\"on the Confirm Order page. \nThe sequence of the successfully paid order decides the shipping \"batch\", and different shipping \"batch\" leads to different delivery date. Please notice that the \"estimated delivery date\" and the \"batch\" keep updating and can only be used as a reference. We will try our best to arrange your delivery by this date."
  },
  {
    "q": "Why did the payment fail?",
    "a": "Payment failure could be caused by the settings of your credit card or payment account, such as your payment limit and available credit. Please verify this information first. Meanwhile, to ensure your payment safety, the banks and the payment platforms have other protection method. Transactions rated as high risk by this risk control system will be blocked automatically. If you can not solve your payment problem, please contact us via ecommerce@insta360.com for help."
  },
  {
    "q": "How to change my shipping information?",
    "a": "If you need to change your shipping information, such as shipping address and telephone number, please contact us before the delivery."
  },
  {
    "q": "How can I pay the tax?",
    "a": "The tax is calculated according to your local tax policy, and we will cover part of the tax for you."
  },
  {
    "q": "How can I get the VAT invoice?",
    "a": "If you need to deliver the Pro to countries such as EU and USA, the VAT invoice will be sent with the package. For other destinations, please contact us via ecommerce@insta360.com"
  },
  {
    "q": "How can I cancel my order or return the Pro?",
    "a": "Please check the Return & Exchange Policy"
  },
  {
    "q": "How about the Warranty & Repair?",
    "a": "Please check the  <a href=\"https://support.insta360.com/aftersales?name=after\" target=\"_blank\">Warranty & Repair Policy</a>"
  },
  {
    "q": "Other question",
    "a": "If your problems can not be solved by the FAQ above, please contact us via ecommerce@insta360.com"
  }
]

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

  // componentWillReceiveProps(nextProps) {
  //   const { auth } = nextProps.reducer
  //   const { router } = nextProps
  //   if (!auth.isLoggedIn) {
  //     router.push('/')
  //   }
  // }

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

  getOrderActions = (order) => {
    const { order_mailto } = this.props.reducer.order
    const orderId = Base64.encode(order.id)
    const payNode = order.state === 0 ? (<Link to={`/order/pay/${orderId}`} className="order-action">{lang.list_table_action_pay_now}</Link>) : null

    const cancelNode = order.state === 0 ? (<Popconfirm title={lang.list_table_action_cancel_confirm_tip} onConfirm={this.cancel.bind(this, order)} okText={lang.list_table_action_cancel_confirm_ok} cancelText={lang.list_table_action_cancel_confirm_cancel}>
      <a href="#" className="order-action">{lang.list_table_action_cancel}</a>
    </Popconfirm>) : null


    const refundNode = order._order.allow_refund ? (
      <a className="order-action" onClick={this.onRefundClick.bind(this, order.id)}>{lang.list_table_action_refund}</a>
    ) : null


    const invoiceNode = order._order.allow_request_invoice ? (
      <a className="order-action" href={order_mailto} >{lang.list_table_action_get_invoice}</a>
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
        title: lang.list_table_column_order_number,
        dataIndex: 'on',
        key: 'on',
        className: 'text-align-center',
        render: (text, record, index) => {
          const orderId = Base64.encode(record.id)
          return (<Link to={`/order/detail/${orderId}`} className="order-link">{record.on}</Link>)
        }
      },
      {
        title: lang.list_table_column_contact_email,
        dataIndex: 'email',
        key: 'email',
        className: 'text-align-center'
      },
      {
        title: lang.list_table_column_created_time,
        dataIndex: 'created',
        key: 'created',
        className: 'text-align-center'
      },
      {
        title: lang.list_table_column_state,
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
          _order: item
        }
      })
    }

    return (
      <div className="list">

        <ConfirmModal {...{ visible: this.state.showConfirmModal, handleOk: this.handleConfirmModalOk, handleCancel: this.handleConfirmModalCancel }} />

        <div className="breadcrumb">
          <div className="container links">
            <h2>{lang.breadcrumb_my_orders}</h2>
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

            <h2>FAQ</h2>

            <Collapse bordered={false}>
              {
                FAQ.map((v, k) =>
                  <Panel header={ (k+1) + '. ' + v.q} key={k}>
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
