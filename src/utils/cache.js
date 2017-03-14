import cookie from 'js-cookie'

class Cache {
  constructor (namespace) {
    this.namespace = namespace || 'default'
    this.obj = {}
  }
  set (key, value) {
    if (window.localStorage) {
      window.localStorage.setItem(key, value)
    } else {
      cookie.set(key, value, { expires: new Date(Date.now() + 99999999999) })
    }
    this.obj[key] = value
  }
  gets () {
    return this.obj
  }
  get (key) {
    var value
    if (window.localStorage) {
      value = window.localStorage.getItem(key)
    } else {
      value = cookie.get(key)
    }
    this.obj[key] = value
    return value
  }
  remove (key) {
    if (window.localStorage) {
      window.localStorage.removeItem(key)
    } else {
      cookie.delete(key)
    }
    delete this.obj[key]
  }
  removes (keys) {
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
