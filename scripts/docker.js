var fs = require('fs')
var shell = require('shelljs')
var exec = shell.exec

var lang = process.env.NODE_LANG === 'zh_CN' ? 'zh_CN' : 'en_US'
var prod = process.env.NODE_PROD === 'prod' ? 'prod' : 'dev'

var cache = 'c111'
var mainVersion = require('../package.json').version
var version = `${mainVersion}.${prod}.${lang}`

const data_env = `module.exports = {
      LANG: '${lang}',
      ENV: 'production',
      CACHE_VERSION: '${cache}'
    }
  `
fs.writeFileSync('./src/locales/node_env.js', data_env)

var cmds = [
  'npm run build',
  'docker build -t mall .',
  `docker tag mall registry.cn-hangzhou.aliyuncs.com/arashivision/fe.mall:${version}`,
  `docker push registry.cn-hangzhou.aliyuncs.com/arashivision/fe.mall:${version}`
]

for (var i = 0; i < cmds.length; i++) {
  var cmd = cmds[i]
  exec(cmd, { silent: false }).stdout
  // console.log(cmd)
}