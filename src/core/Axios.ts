import { IAxiosRequestConfig, IAxiosPromise, TMethods } from '../types'
import dispatchRequest from './dispatchRequest'

// 对多种语法糖做统一的底层处理
export default class Axios {
  request(url: any , config?: any): IAxiosPromise {

    // 重载
    if(typeof url  === 'string') {
        if(!config) {
            config = {}
        }
        config.url = url
    } else {
        config = url
    }

    return dispatchRequest(config)
  }

  get(url: string, config?: IAxiosRequestConfig): IAxiosPromise {
    return this._requestMethodWithoutData('get', url, config)
  }

  delete(url: string, config?: IAxiosRequestConfig): IAxiosPromise {
    return this._requestMethodWithoutData('delete', url, config)
  }

  head(url: string, config?: IAxiosRequestConfig): IAxiosPromise {
    return this._requestMethodWithoutData('head', url, config)
  }

  options(url: string, config?: IAxiosRequestConfig): IAxiosPromise {
    return this._requestMethodWithoutData('options', url, config)
  }

  post(url: string, data?: any, config?: IAxiosRequestConfig): IAxiosPromise {
    return this._requestMethodWithData('post', url, data, config)
  }

  put(url: string, data?: any, config?: IAxiosRequestConfig): IAxiosPromise {
    return this._requestMethodWithData('put', url, data, config)
  }

  patch(url: string, data?: any, config?: IAxiosRequestConfig): IAxiosPromise {
    return this._requestMethodWithData('patch', url, data, config)
  }

  private _requestMethodWithoutData(method: TMethods, url: string, config?: IAxiosRequestConfig) {
    return this.request(
      Object.assign(config || {}, {
        method,
        url
      })
    )
  }

  private _requestMethodWithData(
    method: TMethods,
    url: string,
    data?: any,
    config?: IAxiosRequestConfig
  ) {
    return this.request(
      Object.assign(config || {}, {
        method,
        url,
        data
      })
    )
  }
}
