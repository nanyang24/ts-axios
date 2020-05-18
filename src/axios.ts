import { extend } from './helper/util'
import { IAxiosInstance, IAxiosRequestConfig } from './types'
import Axios from './core/Axios'
import defaults from './default'

/**
 * 满足：
 * 1. 直接调用: axios(config)
 * 2. 语法糖方法: axios.post(config) / axios.get(config)
 */
const createInstance = (config: IAxiosRequestConfig): IAxiosInstance => {
  const context = new Axios(config)
  const instance = Axios.prototype.request.bind(context)

  extend(instance, context)

  return instance as IAxiosInstance
}

const axios = createInstance(defaults)

export default axios
