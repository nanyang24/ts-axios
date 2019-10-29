import { IAxiosRequestConfig } from './types/index'

export default function xhr(config: IAxiosRequestConfig): void {
  const { url, method = 'get', data = null, headers } = config

  const request = new XMLHttpRequest()

  request.open(method.toUpperCase(), url, true)

  _disposeHeader(headers, data, request)

  request.send(data)
}

const _disposeHeader = (headers: any, data: any, request: XMLHttpRequest) => {
  Object.keys(headers).forEach(name => {
    // delete useless header
    if (data === null && name.toLowerCase() === 'content-type') {
      delete headers[name]
    } else {
      // set header
      request.setRequestHeader(name, wipeSemicolon(headers[name]))
    }
  })
}

const wipeSemicolon = (value: string) => value.replace(/;$/gi, '')
