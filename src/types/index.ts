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

export interface IAxiosRequestConfig {
  url: string
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
