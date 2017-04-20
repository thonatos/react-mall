var NODE_ENV = require('./node_env')

if (NODE_ENV.LANG === 'zh_CN') {
  exports.LANG = require('./lang_zh-CN')
  exports.FAQ = require('./faq_zh-CN')
  exports.MENU = require('./menu_zh-CN')
  exports.COUNTRY = require('./country_zh-CN')
  exports.X_Language = 'zh_cn'
} else {
  exports.LANG = require('./lang_en-US')
  exports.FAQ = require('./faq_en-US')
  exports.MENU = require('./menu_en-US')
  exports.COUNTRY = require('./country_en-US')
  exports.X_Language = 'en_us'
}

if (NODE_ENV.ENV === 'production') {
  exports.SERVER = {
    API_SERVER_USER: 'https://api.insta360.com/user/v1',
    API_SERVER_MALL: 'http://fk.insta360.com:8080/insta_mall/mall/v1',
    PAGE_SERVER_PAYMENT: 'http://fk.insta360.com:8080/insta_mall/page/payment?order=',
  }

} else {
  exports.SERVER = {
    API_SERVER_USER: 'https://api.insta360.com/user/v1',
    API_SERVER_MALL: 'http://192.168.2.49:8866/mall/v1',
    PAGE_SERVER_PAYMENT: 'http://192.168.2.49:8866/page/payment?order='
  }
}