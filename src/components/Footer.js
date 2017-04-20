import React, { Component } from 'react'
import { Row, Col } from 'antd'
// import { Link } from 'react-router'
import { MENU } from '../locales/'
const MenuFooter = MENU.footer
const LINK_MENU = MenuFooter.links
const CONTACT = MenuFooter.contact
const COPYRIGHT = MenuFooter.copyrighy

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
                {CONTACT.tell}<span></span>{CONTACT.work_day}
              </p>
            </Col>

          </Row>
        </Col>

        <Col span={24} className="bottom">
          <Row className="container">
            <Col span={12}>
              <p className="copy-right">Copyright © 2017 Arashi Vision All Rights Reserved.</p>
            </Col>
            <Col span={12} className="text-right">
              <p className="icp">{COPYRIGHT.icp}</p>              
            </Col>
          </Row>
        </Col>
      </Row>
    )
  }
}

export default Footer