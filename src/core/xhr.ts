import { IAxiosRequestConfig, IAxiosResponse, IAxiosPromise } from '../types/index'
import { parseHeaders } from '../helper/util'
import { transformResponse } from '../helper/data'
import { createError } from '../helper/error'

export default function xhr(config: IAxiosRequestConfig): IAxiosPromise {
  return new Promise((resolve, reject) => {
    const { url = '', method = 'get', data = null, headers, responseType, timeout } = config

    const request = new XMLHttpRequest()

    if (responseType) {
      request.responseType = responseType
    }

    if (timeout) {
      request.timeout = timeout
    }

    request.open(method.toUpperCase(), url, true)

    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) return

      const responseHeaders = parseHeaders(request.getAllResponseHeaders())
      const responseData = responseType && responseType !== 'text' ? request.response : request.responseText
      const response: IAxiosResponse = {
        data: transformResponse(responseData),
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request,
      }
      handleResponse(response)
    }

    _disposeHeader(headers, data, request)

    // 网络异常
    request.onerror = function handleError() {
      reject(createError('Network Error', config, null, request))
    }
    // 超时
    request.ontimeout = function handleTimeout() {
      reject(createError(`Timeout of ${config.timeout} ms exceeded`, config, 'ECONNABORTED', request))
    }

    const handleResponse = (response: IAxiosResponse): void => {
      // 处理 2XX 请求
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        reject(createError(`Request failed with status code ${response.status}`, config, null, request, response))
      }
    }

    request.send(data)
  })
}

const _disposeHeader = (headers: any, data: any, request: XMLHttpRequest) => {
  Object.keys(headers).forEach(name => {
    // delete useless header
    if (data === null && name.toLowerCase() === 'content-type') {
      delete headers[name]
    } else {
      // set header
      request.setRequestHeader(name, headers[name])
    }
  })
}

// const wipeSemicolon = (value: string) => value.replace(/;$/gi, '')
