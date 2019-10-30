export const typeEqual = (value: any): string => Object.prototype.toString.call(value)

// 会包含 FormData、ArrayBuffer 这些类型
export const isObject: (value: any) => boolean = value =>
  value !== null && typeof value === 'object'

// 不会包含 FormData、ArrayBuffer 这些类型
export const isPlainObject = (value: any): value is Object => typeEqual(value) === '[object Object]'

// value is Date 提供自定义类型保护
export const isDate = (value: any): value is Date => typeEqual(value) === '[object Date]'

export const encode: (value: string) => string = value => {
  return encodeURIComponent(value)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

export const parseHeaders = (headersString: string): any => {
  if (!headersString) return Object.create(null)

  return headersString.split('\r\n').reduce((headerObj: any, stringItem: string): any => {
    let [key, value] = stringItem.split(':')

    if (!key) return headerObj

    key = key.trim().toLowerCase()
    value = value.trim()

    headerObj[key] = value

    return headerObj
  }, {})
}
