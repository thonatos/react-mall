import React, { Component } from 'react'
import { Card, Modal, Form, Input, Radio, Button, Row, Col, Select } from 'antd'
import { LANG, COUNTRY, X_Language } from '../../../locales/'

const RadioGroup = Radio.Group
const FormItem = Form.Item
const Option = Select.Option;

class Delivery extends Component {

  state = {
    visible: false,
    value: 0,
    updated: false
  }

  componentWillReceiveProps(nextProps) {
    const { deliveries } = nextProps.data
    const { handleRadioChange } = nextProps
    if (!this.state.updated && deliveries && deliveries.length > 0) {
      this.setState({
        value: 0,
        updated: true
      }, () => {
        if (handleRadioChange) {
          const { id, country } = deliveries[0]
          handleRadioChange('delivery', {
            id: id,
            country: country
          })
        }
      })
    }
  }

  // Form
  handleSubmit = (e, callback) => {
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
        this.setState({
          value: '',
          updated: false
        }, () => {
          callback(false)
        })
      } else {
        if (typeof (callback) === 'function') {
          callback(err)
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
    this.handleSubmit(e, (err) => {
      if (err) {
        return
      }
      this.setState({
        visible: false
      })
    })
  }

  handleCancel = (e) => {
    this.setState({
      visible: false,
    })
  }

  onChange = (e) => {
    if (!this.state.updated) {
      return
    }

    const { handleRadioChange } = this.props
    const { deliveries } = this.props.data
    this.setState({
      value: e.target.value,
    }, () => {
      if (handleRadioChange) {
        const { id, country } = deliveries[e.target.value]
        handleRadioChange('delivery', {
          id: id,
          country: country
        })
      }
    })
  }

  onCountrySelect = (value, event) => {
    const c = COUNTRY.filter((v) => {
      return v.label === value
    })

    this.props.form.setFields({
      phone_code: {
        value: (c[0].phone_code || '')
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
          newObj[key] = {
            value: delivery[key]
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
        this.setState({
          updated: false
        }, () => {
          delDelivery(deliveries[index])
        })
        break;

      default:
        break;
    }
  }

  // Render
  render() {

    const { getFieldDecorator } = this.props.form
    const { deliveries } = this.props.data

    let radioComponent = (<div></div>)
    const hasDeliveries = deliveries && deliveries.length > 0

    if (hasDeliveries) {
      radioComponent = (
        <RadioGroup ref="drg" onChange={this.onChange} className="delivery-radio-group" value={this.state.value}>
          {
            deliveries.map((obj, key) =>
              <Radio value={key} key={key}>
                <Card title={obj.name} extra={
                  <div>
                    <a onClick={this.doAction.bind(this, 'edit', key)}>{LANG.c_delivery_action_edit}</a>
                    &nbsp;
                    &nbsp;
                    <a onClick={this.doAction.bind(this, 'delete', key)}>{LANG.c_delivery_action_del}</a>
                  </div>
                } style={{
                  marginTop: '1em'
                }}>
                  {
                    X_Language === 'zh_cn' ? (
                      <p>{obj.last_name} {obj.first_name}, {obj.phone}</p>
                    ) : (
                        <p>{obj.first_name} {obj.last_name}, {obj.phone}</p>
                      )
                  }
                  <p>{obj.country}, {obj.province}, {obj.city} </p>
                  <p style={{ overflow: 'hidden' }}>{obj.address}</p>
                  <p>{obj.sub_address}</p>
                </Card>
              </Radio>
            )
          }
        </RadioGroup>
      )
    } else {
      radioComponent = (
        <Row>
          <Col span={7} style={{ paddingRight: '1em' }}>
            <Button size="large" onClick={this.doAction.bind(this, 'create')} style={{
              height: '48px',
              margin: '14px 0',
              width: '100%',
              fontSize: '14px',
              fontWeight: 'normal'
            }}>{LANG.c_delivery_action_add}</Button>
          </Col>
        </Row>)
    }

    return (
      <div className="section">
        <div className="header">
          <h3>{LANG.c_delivery_title}</h3>
          {
            hasDeliveries ? <a onClick={this.doAction.bind(this, 'create')} >{LANG.c_delivery_action_add}</a> : <div></div>
          }
        </div>

        {radioComponent}

        <Modal title={LANG.c_delivery_modal_title}
          visible={this.state.visible}
          okText={LANG.c_delivery_action_save}
          cancelText={LANG.c_delivery_action_cancel}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form className="delivery-form" layout="vertical">

            {/* id */}
            <div className="id">
              <FormItem style={{ margin: '0' }}>
                {
                  getFieldDecorator('id', {
                    rules: [{ required: false }],
                  })(
                    <Input placeholder="id" type="hidden" />
                    )
                }
              </FormItem>
            </div>

            {/* Country */}
            <div className="country">
              <FormItem label={LANG.c_delivery_input_country_label}>
                {getFieldDecorator('country', {
                  rules: [{ required: true, message: LANG.c_delivery_input_country_error_msg }],
                })(
                  <Select onSelect={this.onCountrySelect}>
                    {COUNTRY.map((v, key) =>
                      <Option value={v.label} key={key}>{v.label}</Option>)
                    }
                  </Select>
                  )}
              </FormItem>
              <span style={{
                margin: '-0.5em 0 2em 0',
                display: 'block',
                fontSize: '12px',
                color: '#999'
              }}>{LANG.c_delivery_input_country_tips}  <a href={"mailto:" + LANG.c_delivery_input_country_tips_email}>{LANG.c_delivery_input_country_tips_email}</a></span>
            </div>

            {/* Name */}
            <div className="name">
              {
                X_Language === 'zh_cn' ? (
                  <Row gutter={8}>
                    <Col span={8}>
                      <FormItem label={LANG.c_delivery_input_last_name_label} >
                        {
                          getFieldDecorator('last_name', {
                            rules: [{ required: true, message: LANG.c_delivery_input_last_name_error_msg }],
                          })(
                            <Input placeholder={LANG.c_delivery_input_last_name_placeholder} />
                            )
                        }
                      </FormItem>
                    </Col>
                    <Col span={16}>
                      <FormItem label={LANG.c_delivery_input_first_name_label} >
                        {
                          getFieldDecorator('first_name', {
                            rules: [{ required: true, message: LANG.c_delivery_input_first_name_error_msg }],
                          })(
                            <Input placeholder={LANG.c_delivery_input_first_name_placeholder} />
                            )
                        }
                      </FormItem>
                    </Col>

                  </Row>

                ) : (
                    <Row gutter={8}>
                      <Col span={8}>
                        <FormItem label={LANG.c_delivery_input_first_name_label} >
                          {
                            getFieldDecorator('first_name', {
                              rules: [{ required: true, message: LANG.c_delivery_input_first_name_error_msg }],
                            })(
                              <Input placeholder={LANG.c_delivery_input_first_name_placeholder} />
                              )
                          }
                        </FormItem>
                      </Col>
                      <Col span={16}>
                        <FormItem label={LANG.c_delivery_input_last_name_label} >
                          {
                            getFieldDecorator('last_name', {
                              rules: [{ required: true, message: LANG.c_delivery_input_last_name_error_msg }],
                            })(
                              <Input placeholder={LANG.c_delivery_input_last_name_placeholder} />
                              )
                          }
                        </FormItem>
                      </Col>
                    </Row>
                  )
              }
            </div>

            {/* PhoneNumber */}
            <div className="phone">
              <div className="ant-form-item-label">
                <label className="ant-form-item-required" >{LANG.c_delivery_input_phone_label}</label>
              </div>
              <Row gutter={8}>
                <Col span={4}>
                  <FormItem>
                    {
                      getFieldDecorator('phone_code', {
                        rules: [{ required: false }],
                      })(
                        <Input placeholder={LANG.c_delivery_input_phone_prefix_placeholder} />
                        )
                    }
                  </FormItem>
                </Col>
                <Col span={20}>
                  <FormItem>
                    {
                      getFieldDecorator('phone', {
                        rules: [{ required: true, message: LANG.c_delivery_input_phone_error_msg }],
                      })(
                        <Input placeholder={LANG.c_delivery_input_phone_placeholder} />
                        )
                    }
                  </FormItem>
                </Col>
              </Row>
            </div>

            {/* City/Province */}
            <div className="city">
              <Row gutter={8}>
                <Col span={12}>
                  <FormItem label={LANG.c_delivery_input_province_label}>
                    {
                      getFieldDecorator('province', {
                        rules: [{ required: true, message: LANG.c_delivery_input_province_error_msg }],
                      })(
                        <Input placeholder={LANG.c_delivery_input_province_placeholder} />
                        )
                    }
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem label={LANG.c_delivery_input_city_label}>
                    {
                      getFieldDecorator('city', {
                        rules: [{ required: true, message: LANG.c_delivery_input_city_error_msg }],
                      })(
                        <Input placeholder={LANG.c_delivery_input_city_placeholder} />
                        )
                    }
                  </FormItem>
                </Col>

              </Row>
            </div>

            {/* Address */}
            <div className="address">
              <FormItem label={LANG.c_delivery_input_address_label}>
                {
                  getFieldDecorator('address', {
                    rules: [{ required: true, message: LANG.c_delivery_input_address_error_msg }],
                  })(
                    <Input placeholder={LANG.c_delivery_input_address_placeholder} />
                    )
                }
              </FormItem>
            </div>

            {/* Address Sub */}
            <div className="address">
              <FormItem>
                {
                  getFieldDecorator('sub_address', {
                    rules: [{ required: false, message: LANG.c_delivery_input_address_sub_error_msg }],
                  })(
                    <Input placeholder={LANG.c_delivery_input_address_sub_placeholder} />
                    )
                }
              </FormItem>
            </div>

            {/* ZipCode */}
            <div className="zip">
              <FormItem label={LANG.c_delivery_input_zip_code_label}>
                {
                  getFieldDecorator('zip_code', {
                    rules: [{ required: true, message: LANG.c_delivery_input_zip_code_error_msg }],
                  })(
                    <Input placeholder={LANG.c_delivery_input_zip_code_placeholder} />
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