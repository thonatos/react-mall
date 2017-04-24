import cookie from 'js-cookie'
import { Base64 } from 'js-base64'
import { CACHE_VERSION } from '../locales/'

// Base64.encode

class Cache {

  constructor(options) {
      
    const defaultOptions = {
      namespace: CACHE_VERSION || 'default',
      encryption: 'base64'
    }

    this.options = Object.assign(defaultOptions, options)
    this.obj = {}
  }

  __encrypt(value) {
    if (value) {
      return this.options.encryption === 'base64' ? Base64.encode(value) : value
    }
    return value
  }

  __decrypt(value) {
    if (value) {
      return this.options.encryption === 'base64' ? Base64.decode(value) : value
    }
    return value
  }

  set(key, value) {
    key = this.options.namespace + '_' + key
    value = this.__encrypt(value)
    if (window.localStorage) {
      window.localStorage.setItem(key, value)
    } else {
      cookie.set(key, value, { expires: new Date(Date.now() + 99999999999) })
    }
    this.obj[key] = value
  }

  get(key) {
    key = this.options.namespace + '_' + key
    var value
    if (window.localStorage) {
      value = window.localStorage.getItem(key)
    } else {
      value = cookie.get(key)
    }
    value = this.__decrypt(value)
    this.obj[key] = value
    return value
  }

  remove(key) {
    key = this.options.namespace + '_' + key
    if (window.localStorage) {
      window.localStorage.removeItem(key)
    } else {
      cookie.delete(key)
    }
    delete this.obj[key]
  }

  gets() {
    return this.obj
  }

  removes(keys) {
    if (keys.constructor === Array && keys.length > 0) {
      var i, key
      for (i = 0; i < keys.length; i++) {
        key = keys[i]
        this.remove(key)
      }
    }
  }
}

export default Cache
