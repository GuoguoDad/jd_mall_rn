import React, { PropsWithChildren } from 'react'
import { View, Text, StatusBar, StyleSheet, TouchableOpacity, BackHandler } from 'react-native'
import { NavigationInjectedProps } from 'react-navigation'
import { isAndroid, px2Dp, rnBack, screenWidth } from '@kit'
import { common } from '@config/common'
import { FastImg, Provider } from '@comps'
import { backBlack, backWhite } from '@img'

export default class Scene extends React.Component<SceneProps, SceneState> {
  constructor(props: SceneProps) {
    super(props)
    this.state = {
      backgroundColor: this.props?.backgroundColor || 'white'
    }
  }

  componentDidMount() {
    if (isAndroid()) {
      BackHandler.addEventListener('hardwareBackPress', this._backHandler)
    }
  }

  componentWillReceiveProps(nextProps: Readonly<SceneProps>, nextContext: any) {
    const { backgroundColor = 'white' } = nextProps
    if (backgroundColor !== this.state.backgroundColor) {
      this.setState({ backgroundColor })
    }
  }

  componentWillUnmount() {
    if (isAndroid()) {
      BackHandler.removeEventListener('hardwareBackPress', this._backHandler)
    }
  }

  render() {
    const { backgroundColor } = this.state
    const {
      children,
      hasBack = true,
      title,
      backFun,
      barStyle = 'dark-content',
      contentBackgroundColor = '#f6f6f6',
      renderRight
    } = this.props
    const backHandler = backFun ?? this._backHandler

    return (
      <>
        <StatusBar backgroundColor="transparent" translucent barStyle={barStyle} />
        <View style={[styles.container]}>
          <Provider>
            <View
              style={[
                styles.header,
                {
                  paddingTop: common.currentValue.statusBarHeight,
                  backgroundColor
                }
              ]}
            >
              <View style={styles.left}>
                {hasBack ? (
                  <TouchableOpacity
                    activeOpacity={0.75}
                    accessible
                    onPress={backHandler}
                    style={[styles.container, styles.leftBack]}
                    hitSlop={{ top: 5, bottom: 5, left: 5, right: 20 }}
                  >
                    <FastImg
                      url={barStyle === 'dark-content' ? backBlack : backWhite}
                      priority="high"
                      style={styles.leftIcon}
                    />
                  </TouchableOpacity>
                ) : null}
              </View>
              {/* 标题 */}
              <View style={[styles.container, styles.titleView]}>
                <Text
                  style={[styles.title, { color: barStyle === 'dark-content' ? '#222222' : '#fff' }]}
                  numberOfLines={1}
                >
                  {title}
                </Text>
              </View>
              <View style={styles.left}>{renderRight ? renderRight : null}</View>
            </View>
            {/* 内容 */}
            <View
              style={
                contentBackgroundColor
                  ? [styles.container, { backgroundColor: contentBackgroundColor }]
                  : styles.container
              }
            >
              {children || null}
            </View>
          </Provider>
        </View>
      </>
    )
  }

  _backHandler = () => {
    const { navigation } = this.props
    rnBack(navigation)
    return false
  }
}

export type SceneProps = PropsWithChildren<{
  hasBack?: boolean
  backFun?: () => void
  title: string
  barStyle?: 'light-content' | 'dark-content'
  backgroundColor?: string
  contentBackgroundColor?: string
  renderRight?: React.ReactNode
}> &
  NavigationInjectedProps

type SceneState = {
  backgroundColor: string
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: 'row',
    alignItems: 'center'
  },
  left: {
    height: px2Dp(88),
    width: screenWidth / 4
  },
  leftBack: {
    justifyContent: 'center'
  },
  titleView: {
    height: px2Dp(88),
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontFamily: 'PingFangSC-Semibold',
    fontWeight: '600',
    color: '#fff',
    fontSize: px2Dp(36),
    letterSpacing: 0
  },
  leftIcon: {
    width: px2Dp(48),
    height: px2Dp(48)
  }
})
