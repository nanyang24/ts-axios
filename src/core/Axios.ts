import {
  IAxiosRequestConfig,
  IAxiosResponse,
  IAxiosPromise,
  TMethods,
  ResolvedFn,
  RejectedFn
} from '../types'
import dispatchRequest from './dispatchRequest'
import { InterceptorManager } from '../core/InterceptorManager'

export interface IAxiosInterceptor {
  request: InterceptorManager<IAxiosRequestConfig>
  response: InterceptorManager<IAxiosResponse>
}

interface PromiseChains {
  resolved: ResolvedFn | typeof dispatchRequest
  rejected?: RejectedFn
}

// 对多种语法糖做统一的底层处理
export default class Axios {
  interceptors: IAxiosInterceptor

  constructor() {
    this.interceptors = {
      request: new InterceptorManager<IAxiosRequestConfig>(),
      response: new InterceptorManager<IAxiosResponse>()
    }
  }

  request(url: any, config?: any): IAxiosPromise {
    // 重载
    if (typeof url === 'string') {
      if (!config) {
        config = {}
      }
      config.url = url
    } else {
      config = url
    }

    const chain: PromiseChains[] = [
      {
        resolved: dispatchRequest,
        rejected: undefined
      }
    ]

    // request interceptor
    this.interceptors.request.forEach(interceptor => {
      chain.unshift(interceptor)
    })
    // response interceptor
    this.interceptors.response.forEach(interceptor => {
      chain.push(interceptor)
    })

    let promise = Promise.resolve(config)

    while (chain.length) {
      const { resolved, rejected } = chain.shift()! // https://www.typescriptlang.org/docs/handbook/advanced-types.html#type-guards-and-type-assertions
      promise = promise.then(resolved, rejected)
    }

    return promise

    // return dispatchRequest(config)
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
