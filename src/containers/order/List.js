import moment from 'moment'
import React, { Component } from 'react'
import { Link } from 'react-router'
import { Row, Col, Table, Popconfirm, Collapse } from 'antd'

import './List.less'
import lang from '../../language/'
import { ReduxHelper } from '../../helpers/'

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

const Panel = Collapse.Panel;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`

class List extends Component {

  componentDidMount() {
    const { getUserOrders } = this.props.actions.order
    getUserOrders()
  }

  componentWillReceiveProps(nextProps) {
    const { auth } = nextProps.reducer
    const { router } = nextProps
    if (!auth.isLoggedIn) {
      router.push('/')
    }
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

  render() {
    const { orders } = this.props.reducer

    const columns = [
      {
        title: lang.list_table_column_order_number,
        dataIndex: 'on',
        key: 'on',
        className: 'text-align-center',
        render: (text, record, index) => {
          return (<Link to={`/order/detail/${record.id}`} className="order-link">{record.on}</Link>)
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
          if (record.state === 0) {
            return (<div>
              <Link to={`/order/pay/${record.id}`} className="order-action">{lang.list_table_action_pay_now}</Link>
              <Popconfirm title={lang.list_table_action_cancel_confirm_tip} onConfirm={this.cancel.bind(this, record)} okText={lang.list_table_action_cancel_confirm_ok} cancelText={lang.list_table_action_cancel_confirm_cancel}>
                <a href="#" className="order-action">{lang.list_table_action_cancel}</a>
              </Popconfirm>
            </div>)
          }
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
          action: item.state
        }
      })
    }

    return (

      <div className="list">
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

            <Collapse bordered={false} defaultActiveKey={['1']}>
              <Panel header="This is panel header 1" key="1">
                <p>{text}</p>
              </Panel>
              <Panel header="This is panel header 2" key="2">
                <p>{text}</p>
              </Panel>
              <Panel header="This is panel header 3" key="3">
                <p>{text}</p>
              </Panel>
            </Collapse>
          </Col>
        </Row >
      </div>

    )
  }
}

export default ReduxHelper(List)
