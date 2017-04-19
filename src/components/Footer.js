import React, { Component } from 'react'
import { Row, Col } from 'antd'
import { Link } from 'react-router'

const LINK_BRAND = ['https://static.insta360.com/assets/mall/logo_insta360@2x.png', 'http://www.insta360.com/']

const LINK_SOCIAL = [
  // ['http://www.insta360.com/public/images/v6/footer/wechat@1x.png', ''],
  ['http://www.insta360.com/public/images/v6/footer/weibo@1x.png', 'http://weibo.com/insta360'],
  ['http://www.insta360.com/public/images/v6/footer/facebook@1x.png', 'https://www.facebook.com/Insta360-832149753506055/'],
  ['http://www.insta360.com/public/images/v6/footer/twitter@1x.png', 'https://twitter.com/insta360'],
  ['http://www.insta360.com/public/images/v6/footer/instagram@1x.png', 'https://www.instagram.com/insta360official/'],
  ['http://www.insta360.com/public/images/v6/footer/youku@1x.png', 'https://i.youku.com/insta360'],
  ['http://www.insta360.com/public/images/v6/footer/youtube@1x.png', 'https://www.youtube.com/channel/UC3qWcF49rv8VMZO7Vg6kj5w']
]

const LINK_MENU = [{
  title: 'Site Map',
  links: [
    ['Insta360 Pro', 'http://www.insta360.com/product/insta360-pro'],
    ['Insta360 Air', 'http://www.insta360.com/product/insta360-air'],
    ['Insta360 Nano', 'http://www.insta360.com/product/insta360-nano'],
    ['Insta360 4K', 'http://www.insta360.com/product/insta360-4k'],
    ['Downloads', 'http://www.insta360.com/download']
  ]
},
{
  title: 'How to Buy',
  links: [
    ['Online Store', 'https://support.insta360.com/buy'],
    ['Find a store', 'https://support.insta360.com/buy-map']
  ]
},
{
  title: 'Developer Center',
  links: [
    ['SDK application', 'https://www.wenjuan.com/s/3Y3Izie/']
  ]
}, {
  title: 'About Us',
  links: [
    ['About Insta360', 'http://www.insta360.com/about'],
    ['Newsroom', 'http://blog.insta360.com/'],
    ['Join us', 'http://www.insta360.com/jobs'],
    ['Contact us', 'http://www.insta360.com/contact']
  ]
}]

const POLICY = [
  ['Terms & Conditions', '/page/terms'],
  ['Warranty & Return', 'https://support.insta360.com/aftersales?name=after'],
  ['Privacy Policy', '/page/privacy'],
  ['Shipping Policy ', '/page/shipping-policy']
]

class Footer extends Component {
  render() {
    return (
      <Row className="component-footer">

        <Col span={24} className="top">
          <Row className="container">
            <Col span={4} className="brand">
              <a href={LINK_BRAND[1]} alt="" target="_blank"><img src={LINK_BRAND[0]} alt="" /></a>
            </Col>
            <Col span={20} className="social">
              {
                LINK_SOCIAL.map((social, key) => {
                  return <a href={social[1]} key={key} target="_blank"><img src={social[0]} alt="" /></a>
                })
              }
            </Col>
          </Row>
        </Col>

        <Col span={24} className="middle">
          <Row className="container">
            <Row className="blocks">
              {
                LINK_MENU.map((menu, key) => {
                  return (
                    <Col span={6} className="block" key={key}>
                      <h3 className="title">{menu.title}</h3>
                      <ul className="link-list">
                        {
                          menu.links.map((link, key) => {
                            return (
                              <li key={key}>
                                <a href={link[1]} target="_blank">{link[0]}</a>
                              </li>
                            )
                          })
                        }
                      </ul>
                    </Col>
                  )
                })
              }
            </Row>
            <Col span={24} className="contact">
              <p>
                Toll Free: 888-888-4ASI<span></span>Office Hours: 09:00 - 18:00 (GMT+8), Monday to Friday
              </p>
            </Col>


            <Col span={24} className="policy">
              <ul>
                {
                  POLICY.map((v, key) => {
                    return (
                      <li key={key}>
                        <Link to={v[1]} target="_blank">{v[0]}</Link>
                      </li>
                    )
                  })
                }
              </ul>

            </Col>
          </Row>
        </Col>

        <Col span={24} className="bottom">
          <Row className="container">
            <Col span={12}>
              <p className="copy-right">Copyright © 2017 Arashi Vision All Rights Reserved.</p>
            </Col>
            <Col span={12} className="text-right">
              <p className="icp">Jiang Su ICP  No. 14006102-4.</p>
            </Col>
          </Row>
        </Col>
      </Row>
    )
  }
}

export default Footer