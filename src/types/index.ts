export type TMethods =
  | 'get'
  | 'GET'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'

export interface Axios {
  request(config: IAxiosRequestConfig): IAxiosPromise

  get(url: string, config?: IAxiosRequestConfig): IAxiosPromise

  delete(url: string, config?: IAxiosRequestConfig): IAxiosPromise

  head(url: string, config?: IAxiosRequestConfig): IAxiosPromise

  options(url: string, config?: IAxiosRequestConfig): IAxiosPromise

  post(url: string, data?: any, config?: IAxiosRequestConfig): IAxiosPromise

  put(url: string, data?: any, config?: IAxiosRequestConfig): IAxiosPromise

  patch(url: string, data?: any, config?: IAxiosRequestConfig): IAxiosPromise
}

export interface IAxiosInstance extends Axios {
  (config: IAxiosRequestConfig): IAxiosPromise
  (url: string, config?: IAxiosRequestConfig): IAxiosPromise
}

export interface IAxiosRequestConfig {
  url?: string
  method?: TMethods
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
}

export interface IAxiosResponse {
  data: any
  status: number
  statusText: string
  headers: any
  config: IAxiosRequestConfig
  request: any
}
export interface IAxiosPromise extends Promise<IAxiosResponse> {}

export interface IAxiosError extends Error {
  config: IAxiosRequestConfig
  code?: string
  request?: any
  response?: IAxiosResponse
  isAxiosError: boolean
}
