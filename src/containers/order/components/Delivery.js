import React, { Component } from 'react'
import { Card, Modal, Form, Input, Cascader, Radio } from 'antd'

const RadioGroup = Radio.Group
const FormItem = Form.Item


class Delivery extends Component {

  state = {
    visible: false
  }

  componentDidMount() {
    this.props.form.validateFields()
  }

  // Form
  handleSubmit = (e) => {
    e.preventDefault()
    const { addDelivery, updateDelivery } = this.props
    this.props.form.validateFields((err, delivery) => {
      if (!err) {
        if (delivery.id) {
          console.log('update')
          updateDelivery(delivery)
        } else {
          console.log('create')
          addDelivery(delivery)
        }
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
    const { submitType, handleRadioChange } = this.props    
    const {deliveries} = this.props.data        
    this.setState({
      value: e.target.value,
    }, () => {
      if (handleRadioChange) {
        const id = deliveries[e.target.value].id
        handleRadioChange(submitType, id)
      }
    })
  }

  // doAction 
  doAction = (action, index, event) => {
    const { deliveries } = this.props.data
    const { delDelivery } = this.props

    function mapValues(delivery) {
      let newObj = {}
      for (let key in delivery) {
        if (key) {

          if (key === 'city') {
            let cityArray = delivery[key].split('/')
            let tmp = cityArray.map((v, k) => {
              return v.replace(' ', '_')
            })
            newObj[key] = {
              value: tmp
            }
          } else {
            newObj[key] = {
              value: delivery[key]
            }
          }
        }
      }
      return newObj
    }

    console.log(action)

    switch (action) {
      case 'create':
        this.handleReset()
        this.showModal()
        break;

      case 'edit':
        this.props.form.setFields(mapValues(deliveries[index]))
        this.showModal()
        break;

      case 'delete':
        delDelivery(deliveries[index])
        break;

      default:
        break;
    }
  }

  // Render
  render() {

    const { getFieldDecorator } = this.props.form
    const { overseaAddr, deliveries } = this.props.data
    
    return (
      <div className="section">
        <div className="header">
          <h3>收货地址</h3>
          <a onClick={this.doAction.bind(this, 'create')}>添加新地址</a>
        </div>
        <RadioGroup onChange={this.onChange} className="delivery-radio-group">
          {
            deliveries.map((obj, key) =>
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
                  <Cascader options={overseaAddr} />
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
                  getFieldDecorator('zip_code', {
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