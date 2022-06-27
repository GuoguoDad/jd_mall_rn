import React from 'react'
import { StyleSheet, View, Text, BackHandler, TouchableOpacity } from 'react-native'
import { NavigationInjectedProps } from 'react-navigation'
import { isAndroid, rnBack } from '@kit'

class UnKnowPage extends React.Component<NavigationInjectedProps> {
  constructor(props: NavigationInjectedProps) {
    super(props)
  }

  componentDidMount() {
    if (isAndroid()) {
      BackHandler.addEventListener('hardwareBackPress', this._backHandler)
    }
  }

  componentWillUnmount() {
    if (isAndroid()) {
      BackHandler.removeEventListener('hardwareBackPress', this._backHandler)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.tips}>该页面不存在，请更新至最新版本后重试~</Text>
        <TouchableOpacity style={styles.btnBack} activeOpacity={0.75} onPress={this._backHandler}>
          <Text style={styles.backTxt}>返回</Text>
        </TouchableOpacity>
      </View>
    )
  }

  _backHandler = () => {
    const { navigation } = this.props
    rnBack(navigation)
    return false
  }
}

export default UnKnowPage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F2F2F2'
  },
  tips: {
    fontSize: 18
  },
  btnBack: {
    width: '50%',
    marginTop: 20,
    paddingVertical: 4,
    backgroundColor: 'grey',
    borderRadius: 9
  },
  backTxt: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white'
  }
})
