import { Base64 } from 'js-base64'

exports.Base64 = {
  encode: function(value){
    return Base64.encode(value.toString(2))
  },
  decode: function(value){
    return parseInt(Base64.decode(value),2) 
  }
}