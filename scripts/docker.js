var shell = require('shelljs')
var exec = shell.exec

var mainVersion = require('../package.json').version
var dateString = new Date().toLocaleDateString()

if(process.env.NODE_ENV === 'production'){
  version = `${mainVersion}-rc.${dateString}`
}else{
  version = `${mainVersion}-beta.${dateString}`
}

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