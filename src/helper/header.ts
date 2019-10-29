import { isPlainObject } from './util'

// 大小写规范化重置
function normalizeHeaderName(headers: any, normalizedName: string): void {
  if (!headers) return

  Object.keys(headers).forEach(name => {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = headers[name]
      delete headers[name]
    }
  })
}

export function processHeaders(headers: any, data: any): any {
  normalizeHeaderName(headers, 'Content-Type')

  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      // charset=utf-8 在这里不必要，因为 JSON默认为UTF-8，参见 ietf.org/rfc/rfc4627.txt
      headers['Content-Type'] = 'application/json'
    }
  }
  return headers
}
