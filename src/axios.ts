import { extend } from './helper/util'
import { IAxiosInstance } from './types/index'
import Axios from './core/Axios'

/**
 * 满足：
 * 1. 直接调用: axios(config)
 * 2. 语法糖方法: axios.post(config) / axios.get(config)
 */
const createInstance = (): IAxiosInstance => {
  const context = new Axios()
  const instance = Axios.prototype.request.bind(context)

  extend(instance, context)

  return instance as IAxiosInstance
}

const axios = createInstance()

export default axios
