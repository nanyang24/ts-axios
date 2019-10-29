// entrance
import { IAxiosRequestConfig } from './types/index'
import xhr from './xhr'

function axios(config: IAxiosRequestConfig): void {
  xhr(config)
}

export default axios
