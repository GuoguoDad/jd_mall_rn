import { View } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { createStackNavigator } from 'react-navigation'
import { getActiveRouteName, getCommonInfo, isValidPage, useQueryParams } from '@kit'
import { UrlProps } from '@type'
import { RoutesEnum, routes } from '@routes'
import { name as appName } from '../app.json'

import { common } from '@config/common'
import { screen } from '@config/screen'

/**
 * 页面入口
 * @param props 客户端传入的参数
 * @constructor
 */
const Index = (props: AppProps) => {
  const { initRouteUrl = `https://com.aries.com?pageCode=rn&bundleName=${appName}&initRouteName=UserSetting` } = props

  //initRouteUrl 是打开页面的入口，由app菜单或者cms配置
  const { initRouteName } = useQueryParams<UrlProps>(initRouteUrl)

  //判断initRouteUrl配置是否正确
  let finalInitRouteName = initRouteName
  if (!isValidPage(routes, initRouteName)) {
    finalInitRouteName = RoutesEnum.UnKnowPage
  }

  //设置initRouteName 和 currentScreen
  screen.currentValue = { initRouteName: finalInitRouteName, currentScreen: finalInitRouteName }

  const [isEnvInit, setIsEnvInit] = useState(false)

  //显示页面前设置共用的属性，列如:店铺编号,城市编号,状态栏高度,底部距离
  useEffect(() => {
    getCommonInfo().then(({ statusBarHeight, bottomSpace }) => {
      common.currentValue = { statusBarHeight, bottomSpace }
      setIsEnvInit(true)
    })
  }, [])

  const AppContainer = useMemo(
    () =>
      createStackNavigator(routes, {
        initialRouteName: finalInitRouteName,
        initialRouteParams: { ...props },
        mode: 'card',
        headerMode: 'none',
        navigationOptions: {
          header: null,
          gesturesEnabled: true
        }
      }),
    [finalInitRouteName]
  )

  return isEnvInit ? (
    <AppContainer
      onNavigationStateChange={(prevState, currentState) => {
        const previousScreen = getActiveRouteName(prevState)
        const currentScreen = getActiveRouteName(currentState)
        if (previousScreen !== currentScreen) {
          //设置initRouteName 和 currentScreen
          screen.currentValue = { initRouteName: finalInitRouteName, currentScreen }
        }
      }}
    />
  ) : (
    <View />
  )
}

export default Index

type AppProps = {
  initRouteUrl: string
}
