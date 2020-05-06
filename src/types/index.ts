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
  interceptors: {
    request: AxiosInterceptorManager<IAxiosRequestConfig>
    response: AxiosInterceptorManager<IAxiosResponse>
  }

  request<T = any>(config: IAxiosRequestConfig): IAxiosPromise<T>

  get<T = any>(url: string, config?: IAxiosRequestConfig): IAxiosPromise<T>

  delete<T = any>(url: string, config?: IAxiosRequestConfig): IAxiosPromise<T>

  head<T = any>(url: string, config?: IAxiosRequestConfig): IAxiosPromise<T>

  options<T = any>(url: string, config?: IAxiosRequestConfig): IAxiosPromise<T>

  post<T = any>(url: string, data?: any, config?: IAxiosRequestConfig): IAxiosPromise<T>

  put<T = any>(url: string, data?: any, config?: IAxiosRequestConfig): IAxiosPromise<T>

  patch<T = any>(url: string, data?: any, config?: IAxiosRequestConfig): IAxiosPromise<T>
}

export interface IAxiosInstance extends Axios {
  <T = any>(config: IAxiosRequestConfig): IAxiosPromise<T>
  <T = any>(url: string, config?: IAxiosRequestConfig): IAxiosPromise<T>
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

export interface IAxiosResponse<T = any> {
  data: T
  status: number
  statusText: string
  headers: any
  config: IAxiosRequestConfig
  request: any
}
export interface IAxiosPromise<T = any> extends Promise<IAxiosResponse<T>> {}

export interface IAxiosError extends Error {
  config: IAxiosRequestConfig
  code?: string
  request?: any
  response?: IAxiosResponse
  isAxiosError: boolean
}

// Interceptor
export interface AxiosInterceptorManager<T> {
  use(resolved: ResolvedFn<T>, rejected?: RejectedFn<T>): number

  eject(id: number): void
}

export interface ResolvedFn<T = any> {
  // T: sync codes
  // Promise<T>: async codes
  (val: T): T | Promise<T>
}

export interface RejectedFn<T = any> {
  (error: T): T
}
