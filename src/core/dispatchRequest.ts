// entrance
import { IAxiosRequestConfig, IAxiosPromise } from '../types/index'
import { buildURL } from '../helper/url'
import { transformRequest } from '../helper/data'
import { processHeaders, flattenHeaders } from '../helper/header'
import xhr from './xhr'

const axios = (config: IAxiosRequestConfig): IAxiosPromise => xhr(processConfig(config))

const processConfig = (config: IAxiosRequestConfig): IAxiosRequestConfig => {
  config.url = transformUrl(config)
  config.headers = transformHeader(config)
  config.headers = flattenHeaders(config.headers, config.method!)
  config.data = transformRequestData(config)
  return config
}

const transformUrl = (config: IAxiosRequestConfig): string => {
  const { url, params } = config

  // FIXME : url as string
  return buildURL(url as string, params)
}

const transformRequestData = (config: IAxiosRequestConfig): any => transformRequest(config.data)

const transformHeader = (config: IAxiosRequestConfig): any => {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

export default axios
