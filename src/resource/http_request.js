import axios from 'axios'
import humps from 'humps'

const ORIGIN_API_URL = 'https://suki-workshop.herokuapp.com'

let axiosInstance = axios.create({
  baseURL: `${ORIGIN_API_URL}`,
  timeout: 120000
})

axiosInstance.interceptors.request.use(function (config) {
  // Do something before request is sent
  config.params = humps.decamelizeKeys(config.params)
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// Add a response interceptor
axiosInstance.interceptors.response.use(function (response) {
  // Do something with response data
  return humps.camelizeKeys(response)
  // return response
}, function (error) {
  // Do something with response error
  return Promise.reject(error)
})

class HttpRequest {
  constructor () {
    this.axios = axios
  }

  fetch (methodName, data) {
    return axiosInstance.get(methodName, {
      params: data
    })
  }

  create (methodName, data) {
    return axiosInstance.post(methodName, data)
  }

  update (methodName, data) {
    return axiosInstance.put(methodName, data)
  }

  edit (methodName, data) {
    return axiosInstance.patch(methodName, data)
  }

  remove (methodName, data) {
    return axiosInstance.delete(methodName, { data })
  }

  delete (methodName, id) {
    return axiosInstance.delete(methodName, { params: { id } })
  }

  request (type, url, data) {
    let promise = null
    switch (type) {
      case 'GET': promise = axios.get(url, { params: data }); break
      case 'POST': promise = axios.post(url, data); break
      case 'PUT': promise = axios.put(url, data); break
      case 'PATCH': promise = axios.patch(url, data); break
      case 'DELETE': promise = axios.delete(url, data); break
      default : promise = axios.get(url, { params: data }); break
    }
    return promise
  }
}

export default HttpRequest
