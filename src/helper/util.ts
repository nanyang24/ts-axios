export const isDate: (value: any) => boolean = value => toString.call(value) === '[object Date]'
