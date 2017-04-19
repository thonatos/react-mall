if (process.env.LANGUAGE === 'zh_cn') {
  module.exports = require('./zh_cn')
} else {
  module.exports = require('./en_us')
}


// const LINK_MENU = [{
//   title: 'Site Map',
//   links: [
//     ['Insta360 Pro', 'http://www.insta360.com/product/insta360-pro'],
//     ['Insta360 Air', 'http://www.insta360.com/product/insta360-air'],
//     ['Insta360 Nano', 'http://www.insta360.com/product/insta360-nano'],
//     ['Insta360 4K', 'http://www.insta360.com/product/insta360-4k'],
//     ['Downloads', 'http://www.insta360.com/download']
//   ]
// },
// {
//   title: 'How to Buy',
//   links: [
//     ['Online Store', 'https://support.insta360.com/buy'],
//     ['Find a store', 'https://support.insta360.com/buy-map']
//   ]
// },
// {
//   title: 'Developer Center',
//   links: [
//     ['SDK application', 'https://www.wenjuan.com/s/3Y3Izie/']
//   ]
// }, {
//   title: 'About Us',
//   links: [
//     ['About Insta360', 'http://www.insta360.com/about'],
//     ['Newsroom', 'http://blog.insta360.com/'],
//     ['Join us', 'http://www.insta360.com/jobs'],
//     ['Contact us', 'http://www.insta360.com/contact']
//   ]
// }]

// const POLICY = [
//   ['Terms & Conditions', '/page/terms'],
//   ['Warranty & Return', 'https://support.insta360.com/aftersales?name=after'],
//   ['Privacy Policy', '/page/privacy'],
//   ['Shipping Policy ', '/page/shipping-policy']
// ]