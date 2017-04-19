import React, { Component } from 'react'

class Paypal extends Component {

  componentDidMount() {

    const paypal= window.paypal

    var baseUrl = 'http://fk.insta360.com:8080/insta_mall';
    let container = this.props.id
    let orderId = this.props.orderId

    paypal.Button.render({
      env: 'production',

      style: {
            size: 'medium', // responsive
            color: 'gold',
            shape: 'rect',
            label: ''
        },

      client: {
        'production': 'AXAlJiVTaA9TuO2j94aaArgBBDSWoTYbj1OokCRcuxPe3uST8qEerUY1ES7zdsAqZuZqsCyLY13xooAG'
      },

      commit: false,

      payment: function (resolve, reject) {
        var CREATE_PAYMENT_URL = baseUrl + '/mall/v1/payment/payOrder';
        var params = { id: orderId, channel: 'paypal' };
        return paypal.request.post(CREATE_PAYMENT_URL, null, { json: params })
          .then(function (json) {
            console.log('###TTT', json.data.payData)
            if (json.code === 0) {
              resolve(json.data.payData.paymentId);
            }
            else {
              reject(json.errorMsg);
              alert(json.errorMsg);
            }
          })
          .catch(function (err) {
            reject(err);
          });
      },

      onAuthorize: function (data, actions) {
        var EXECUTE_PAYMENT_URL = baseUrl + '/mall/v1/payment/executePaypalPayment';
        var params = { paymentId: data.paymentID, payerId: data.payerID };
        return paypal.request.post(EXECUTE_PAYMENT_URL, null, { json: params })
          .then(function (json) {
            /* Go to a success page */
            if (json.code === 0) {
              window.location.href = data.returnUrl;
            } else {
              alert(json.errorMsg);
            }
          })
          .catch(function (err) {
            /* Go to an error page  */
            alert(err);
          });
      }
    }, container);

  }

  render() {
    return (
      <a id={this.props.id}></a>
    )
  }
}

export default Paypal