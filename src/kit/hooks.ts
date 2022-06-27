import qs from 'qs'
import { screen } from '@config/screen'

/**
 * 判断当页面是在栈顶
 */
export const useIsFirstRouteInParent = () => {
  const { initRouteName, currentScreen } = screen.currentValue
  return initRouteName === currentScreen
}

/**
 * 解析链接携带的参数
 * @param url
 */
export function useQueryParams<QueryParams extends { [K in keyof QueryParams]?: unknown } = {}>(
  url: string
): QueryParams {
  const query = qs.parse(url, { ignoreQueryPrefix: true })
  return query as QueryParams
}

/**
 * 单位时间内执行第一次
 */
export const useCallOnceInInterval = () => {
  let isCalled = false
  return (functionTobeCalled: Function, interval = 800) => {
    if (!isCalled) {
      isCalled = true
      let timer = setTimeout(() => {
        isCalled = false
        clearTimeout(timer)
      }, interval)
      return functionTobeCalled()
    }
  }
}
