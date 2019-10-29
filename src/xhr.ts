import { IAxiosRequestConfig } from './types/index'

export default function xhr(config: IAxiosRequestConfig): void {
  const { url, method = 'get', data = null } = config

  const request = new XMLHttpRequest()

  request.open(method.toUpperCase(), url, true)

  request.send(data)
}
