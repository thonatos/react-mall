var fs = require('fs')
var ovs = require('./oversea.1.json')

// var ovs = [
//   {
//     value: 'zhejiang',
//     label: 'Zhejiang',
//     children: [{
//       value: 'hangzhou',
//       label: 'Hangzhou',
//       children: [{
//         value: 'xihu',
//         label: 'West Lake',
//       }, {
//         value: 'xihu',
//         label: 'aest Lake',
//       },
//       {
//         value: 'xihu',
//         label: 'best Lake',
//         children: [{
//           value: 'xihu',
//           label: 'West Lake',
//           children: [{
//             value: 'xihu',
//             label: 'West Lake',
//           }, {
//             value: 'xihu',
//             label: 'aest Lake',
//           },
//           {
//             value: 'xihu',
//             label: 'best Lake',
//           }]
//         }]
//       }],
//     }],
//   },
//   {
//     value: 'jiangsu',
//     label: 'Jiangsu',
//     children: [{
//       value: 'nanjing',
//       label: 'Nanjing',
//       children: [{
//         value: 'zhonghuamen',
//         label: 'Zhong Hua Men',
//       }],
//     }],
//   }
// ]

function deepSort(arr) {
  arr = arr.sort((a, b) => {
    console.log(a.label[0], b.label[0])
    return a.label.charCodeAt(0) - b.label.charCodeAt(0)
  })

  for (var i = 0; i < arr.length; i++) {
    var arr2 = arr[i]
    if (arr2.children && arr2.children.length > 0) {
      arr2.children = deepSort(arr2.children)
    }
  }
  return arr
}

var res = deepSort(ovs)

fs.writeFile('./oversea.json', JSON.stringify(res), (err, res) => {
  console.log(err, res)
})
