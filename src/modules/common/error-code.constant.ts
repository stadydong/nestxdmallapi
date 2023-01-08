export const ErrorCodeMap = {
  // 10000 - 99999 业务操作错误
  10000:"没有该父级模块",
  10001:"模块不存在"
}

export type ErrorCodeMapType = keyof typeof ErrorCodeMap
