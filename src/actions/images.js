import axios from 'axios'

export const IMAGES_FETCH = 'IMAGES_FETCH'
export const IMAGES_FETCH_SUCCESS = 'IMAGES_FETCH_SUCCESS'
export const IMAGES_FETCH_ERROR = 'IMAGES_FETCH_ERROR'

function requestData() {
  return {
    type: IMAGES_FETCH
  }
}

function receiveData(json) {
  return {
    type: IMAGES_FETCH_SUCCESS,
    data: json
  }
}

function receiveError(json) {
  return {
    type: IMAGES_FETCH_ERROR,
    data: json
  }
}

export function fetchImages(url) {
  return (dispatch) => {
    dispatch(requestData())
    return axios({
      url: url,
      timeout: 20000,
      method: 'get',
      responseType: 'json'
    }).then(function (response) {
      dispatch(receiveData(response.data))
    }).catch(function (response) {
      dispatch(receiveError(response.data))
    })
  }
}