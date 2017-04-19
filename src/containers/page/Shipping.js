import React, { Component } from 'react'

export default class Shipping extends Component {
  render() {
    return (
      <div className="container post-section">
        <h2 className="p-title">SHIPPING POLICY</h2>
        <div className="p-content">
          <p className="p1"><span className="s1"><b>Delivery Time</b></span></p>
          <p className="p1"><span className="s1">Delivery Time is dependent on three factors: </span></p>
          <ol className="ol1">
            <li className="li2"><span className="s1">Availability- The product details page will show a value similar to "Estimated shipping time: March, 3rd". It is also noted in the Cart, on My Orders page and Order Summary page to inform you of the estimated time the item will be ready to ship out. The "Availability" value is an estimate. We do our best to ship items out as quickly as possible, so we often get orders out faster than is noted on the relevant pages, but please do not count on that.</span></li>
            <li className="li2"><span className="s1">The methods of delivery- Our primary shipping method is DHL. UPS and EMS may also be used to in certain conditions to optimize the delivery time and safety. As a result, the time will be determined mainly by the shipping methods and shown on the official websites of these delivery companies. If you request certain shipping method, please contact our customer service team.</span></li>
            <li className="li2"><span className="s1">Destination- The delivery time from Insta360 or authorized distributors to the shipping address has differences. The rules of customs of different countries are various. It may take a different length of time for customs liquidation. In the meantime,<span className="Apple-converted-space">  </span>delivery to the remote area may be longer than urban transport junction.</span></li>
          </ol>
          <p className="p3"><span className="s1">Additionally, please note that delivery time is also based on "business" days. For example, if you place an order on Sunday, it is impossible for us to ship an item to the shippers before Monday.</span></p>
          <p className="p1"><span className="s1"><b>Calculating Cost</b></span></p>
          <p className="p1"><span className="s1">We do not profit from shipping. Should you charge rush shipping, or if we are shipping your order internationally, your shipping cost will be the same as we are charged by whichever shipping company is used to deliver your package. Shipping costs are calculated on the website automatically, and shown on the Order Summary page.</span></p>
        </div>
      </div>
    )
  }
}