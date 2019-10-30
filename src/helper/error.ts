import { IAxiosRequestConfig, IAxiosResponse } from '../types'

export class AxiosError extends Error {
  config: IAxiosRequestConfig
  code?: string | null
  request?: any
  response?: IAxiosResponse
  isAxiosError: boolean

  constructor(
    message: string,
    config: IAxiosRequestConfig,
    code?: string | null,
    request?: any,
    response?: IAxiosResponse
  ) {
    super(message)

    this.config = config
    this.code = code
    this.request = request
    this.response = response
    this.isAxiosError = true

    // https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
    Object.setPrototypeOf(this, AxiosError.prototype)
  }
}

export function createError(
  message: string,
  config: IAxiosRequestConfig,
  code?: string | null,
  request?: any,
  response?: IAxiosResponse
): AxiosError {
  const error = new AxiosError(message, config, code, request, response)

  return error
}
