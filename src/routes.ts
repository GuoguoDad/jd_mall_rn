import { NavigationRouteConfigMap } from 'react-navigation'

import UnKnowPage from '@pages/unknow-page'
import UserSetting from '@pages/user-settting'

export enum RoutesEnum {
  UnKnowPage = 'UnKnowPage',
  UserSetting = 'UserSetting'
}

export const routes: NavigationRouteConfigMap = {
  [RoutesEnum.UnKnowPage]: {
    screen: UnKnowPage
  },
  [RoutesEnum.UserSetting]: {
    screen: UserSetting
  }
}
