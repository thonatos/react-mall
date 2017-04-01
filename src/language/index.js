if (process.env.LANGUAGE === 'zh_cn') {
  module.exports = require('./zh_cn')
} else {
  module.exports = require('./en_us')
}