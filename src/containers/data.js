export const assets = {
  sketch: require('../assets/product/pro/sketch@2x.png')
}

export const products = {
  pro: {
    name: 'Insta360 Pro',
    img: require('../assets/product/pro/pro-large@2x.png'),
    suits: [
      {
        name: 'default',
        price: '$3000',
        goods: 'Camera PRO + XX + XX',
        specs: [1, 2, 3, 4, 5, 6]
      },
      {
        name: 'extral',
        price: '$8000',
        goods: 'Camera PRO + XX + XX + XX',
        specs: [1, 6]
      }
    ]
  },
  nano: {
    name: 'Insta360 Nano',
    img: require('../assets/product/pro/pro-large@2x.png'),
    suits: [
      {
        name: 'default',
        price: '$300',
        goods: 'Camera Nano + XX + XX',
        specs: [1, 2, 3, 4, 5, 6]
      },
      {
        name: 'extral',
        price: '$800',
        goods: 'Camera Nano + XX + XX + XX',
        specs: [1, 6]
      }
    ]
  }
}

export const order = {
  invoice: [
    {
      type: 'none',
      desc: '不需要发票'
    },
    {
      type: 'zzs',
      desc: '增值税普通发票'
    },
    {
      type: 'zzs',
      desc: '电子'
    },
    {
      type: 'zzs',
      desc: '纸质'
    },
    {
      type: 'zzs',
      desc: '个人'
    },
    {
      type: 'zzs',
      desc: '单位'
    }
  ],
  payments: [
    {
      type: 'none',
      desc: '在线支付'
    },
    {
      type: 'zzs',
      desc: '货到付款'
    }
  ],
  address: {
    cities: [{
      value: 'zhejiang',
      label: 'Zhejiang',
      children: [{
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [{
          value: 'xihu',
          label: 'West Lake',
        }],
      }],
    }, {
      value: 'jiangsu',
      label: 'Jiangsu',
      children: [{
        value: 'nanjing',
        label: 'Nanjing',
        children: [{
          value: 'zhonghuamen',
          label: 'Zhong Hua Men',
        }],
      }],
    }]
  }
}

export const user = {
  profile: {
    thumb: require('../assets/product/pro/pro-large@2x.png'),
    mail: 'thonatos@sina.com'
  },
  address: [
    {
      id: '1',
      address: "jiangsu nanjing xinsisis",
      city: [
        'jiangsu', 'nanjing', 'zhonghuamen'
      ],
      name: "thonatos 0",
      phone: "18013140312",
      zip: "000000"
    },
    {
      id: '2',
      address: "jiangsu nanjing xinsisis",
      city: [
        'jiangsu', 'nanjing', 'zhonghuamen'
      ],
      name: "thonatos 1",
      phone: "18013140312",
      zip: "000000"
    },
    {
      id: '3',
      address: "jiangsu nanjing xinsisis",
      city: [
        'jiangsu', 'nanjing', 'zhonghuamen'
      ],
      name: "thonatos 2",
      phone: "18013140312",
      zip: "000000"
    },
    {
      id: '4',
      address: "jiangsu nanjing xinsisis",
      city: [
        'jiangsu', 'nanjing', 'zhonghuamen'
      ],
      name: "thonatos 3",
      phone: "18013140312",
      zip: "000000"
    }
  ],
  orders: {
    closed: [
      {
        key: 'xxx',
        thumb: require('../assets/product/pro/pro-large@2x.png'),
        sn: 'Insta360 Pro',
        datetime: '2014-12-24 23:12:00',
        price: 2000
      }
    ],
    paying: [
      {
        key: 'xxx',
        thumb: require('../assets/product/pro/pro-large@2x.png'),
        sn: 'Insta360 Nano',
        datetime: '2014-12-24 23:12:00',
        price: 100000
      }
    ],
    receiving: [
      {
        key: 'xxx',
        thumb: require('../assets/product/pro/pro-large@2x.png'),
        sn: 'Insta360 Nano',
        datetime: '2014-12-24 23:12:00',
        price: 100000
      }
    ]
  },
  cart: [
    {
      key: 'pro',
      thumb: require('../assets/product/pro/pro-large@2x.png'),
      name: 'Insta360 Pro',
      count: 1,
      price: 2000
    }
  ]
}



