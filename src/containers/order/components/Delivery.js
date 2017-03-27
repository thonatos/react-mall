import React, { Component } from 'react'
import { Card, Modal, Form, Input, Cascader, Radio } from 'antd'

const RadioGroup = Radio.Group
const FormItem = Form.Item


class Delivery extends Component {

  constructor(props) {
    super(props)

    console.log(this.props)
    this.state = {
      visible: false,
      addr: [...this.props.data.user.address]
    }
  }

  componentDidMount() {
    this.props.form.validateFields()
  }

  // Form
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        if (values.id) {
          console.log('update')
          this.db('update', values)
        } else {
          console.log('create')
          this.db('create', values)
        }
        this.props.handleResult(values)
      }
    })
  }

  handleReset = () => {
    this.props.form.resetFields()
  }

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

  onChange = (e) => {    
    const { submitType, handleRadioChange} = this.props
    this.setState({
      value: e.target.value,
    }, () => {
      if (handleRadioChange) {
        handleRadioChange(submitType, this.state.addr[this.state.value].id)
      }
    })

    console.log('Address checked', e.target.value, this.state.addr[e.target.value].id)    
  }

  // db
  db = (action, addr) => {
    let t = [...this.state.addr]

    switch (action) {
      case 'update':
        for (let index in t) {
          if (addr.id === t[index].id) {
            t[index] = addr
          }
        }
        break;

      case 'create':
        t.push(addr)
        break;

      default:
        break;
    }

    this.setState({
      addr: [...t]
    })
  }

  // doAction 
  doAction = (action, index, event) => {
    console.log(action)
    function mapValues(object) {
      let newObj = {}
      for (let key in object) {
        if (key) {
          newObj[key] = {
            value: object[key]
          }
        }
      }
      return newObj
    }

    switch (action) {
      case 'create':
        this.handleReset()
        this.showModal()
        break;

      case 'edit':
        this.props.form.setFields(mapValues(this.state.addr[index]))
        this.showModal()
        break;

      case 'delete':
        let t = [...this.state.addr]
        t.splice(index, 1)
        this.setState({
          addr: [...t]
        })
        break;

      default:
        break;
    }
  }

  // Render
  render() {

    const { getFieldDecorator } = this.props.form
    const { cities } = this.props.data.order
    const address = this.state.addr

    return (
      <div className="section">
        <div className="header">
          <h3>收货地址</h3>
          <a onClick={this.doAction.bind(this, 'create')}>添加新地址</a>
        </div>
        <RadioGroup onChange={this.onChange} className="delivery-radio-group">
          {
            address.map((obj, key) =>
              <Radio value={key} key={key}>
                <Card title={obj.name} extra={
                  <div>
                    <a onClick={this.doAction.bind(this, 'edit', key)}>编辑</a>
                    &nbsp;
                    &nbsp;
                    <a onClick={this.doAction.bind(this, 'delete', key)}>删除</a>
                  </div>
                } style={{
                  marginTop: '1em'
                }}>
                  <p>{obj.phone}</p>
                  <p>{obj.address}</p>
                </Card>
              </Radio>
            )
          }
        </RadioGroup>

        <Modal title="添加新地址"
          visible={this.state.visible}
          okText="保存"
          cancelText="取消"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form className="delivery-form">

            {/* id */}
            <div className="id">
              <FormItem>
                {
                  getFieldDecorator('id', {
                    rules: [{ required: false, message: 'Please input your name!' }],
                  })(
                    <Input placeholder="id" disabled />
                    )
                }
              </FormItem>
            </div>

            {/* Name */}
            <div className="name">
              <FormItem>
                {
                  getFieldDecorator('name', {
                    rules: [{ required: true, message: 'Please input your name!' }],
                  })(
                    <Input placeholder="Name" />
                    )
                }
              </FormItem>
            </div>

            {/* PhoneNumber */}
            <div className="phone">
              <FormItem>
                {getFieldDecorator('phone', {
                  rules: [{ required: true, message: 'Please input your phone number!' }],
                })(
                  <Input placeholder="Phone Number" />
                  )}
              </FormItem>
            </div>

            <div className="city">
              {/* City */}
              <FormItem>
                {getFieldDecorator('city', {
                  initialValue: ['zhejiang', 'hangzhou', 'xihu'],
                  rules: [{ type: 'array', required: true, message: 'Please select your habitual residence!' }],
                })(
                  <Cascader options={cities} />
                  )}
              </FormItem>
            </div>

            {/* Address */}
            <div className="address">
              <FormItem>
                {
                  getFieldDecorator('address', {
                    rules: [{ required: true, message: 'Please input your address detail!' }],
                  })(
                    <Input placeholder="Address Detail" />
                    )
                }
              </FormItem>
            </div>

            {/* ZipCode */}
            <div className="zip">
              <FormItem>
                {
                  getFieldDecorator('zip', {
                    rules: [{ required: true, message: 'Please input your zip code!' }],
                  })(
                    <Input placeholder="Zip Code" />
                    )
                }
              </FormItem>
            </div>

          </Form>
        </Modal>
      </div>

    )
  }
}

export default Form.create()(Delivery)