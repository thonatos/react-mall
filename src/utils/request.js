import axios from 'axios'
import { X_Language } from '../config/'
import Cache from './cache'

const cache = new Cache()

// function request(options, success, error) {

//   // console.log(options)

//   return axios({
//     url: options.url,
//     timeout: 20000,
//     method: options.method || 'get',
//     data: options.data || null,
//     headers: {
//       'X-Language': 'en_us',
//       'X-User-Token': '64651b5085bf35f9f6e12ee462de8dfb'
//     },
//     responseType: 'json'
//   }).then(function (response) {
//     success(response.data)
//   }).catch(function (response) {
//     console.log('#server', response)
//     error(response)
//   })
// }

export default function (options, success, error) {

  // console.log(options)

  let queryObj = {
    url: options.url,
    timeout: 20000,
    method: options.method || 'get',
    responseType: options.responseType || 'json'
  }

  let headers = {}

  if (!!options.language) {
    headers['X-Language'] = X_Language
  }
  
  if (!!options.token) {
    const auth = cache.get('auth')    
    const token = auth ? JSON.parse(auth).token : ''

    // console.log('xxx', token)
    headers['X-User-Token'] = token
  }

  queryObj.headers = headers

  if (!!options.data) {
    queryObj.data = options.data
  }

  return axios(queryObj).then(function (response) {
    success(response.data)
  }).catch(function (response) {
    console.log('#server', response)
    error(response)
  })
}