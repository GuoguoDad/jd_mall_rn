import React, { isValidElement } from 'react'
import { ScrollView, Text, TextStyle } from 'react-native'
import Modal from './Modal'
import { Action } from './PropsType'
import { px2Dp } from '@kit'

export interface AlertContainerProps {
  title: React.ReactNode
  titleStyle: TextStyle
  content: React.ReactNode
  actions: Action<TextStyle>[]
  onAnimationEnd?: (visible: boolean) => void
}

export default class AlertContainer extends React.Component<AlertContainerProps, any> {
  constructor(props: AlertContainerProps) {
    super(props)
    this.state = {
      visible: true
    }
  }

  onClose = () => {
    this.setState({
      visible: false
    })
  }

  render() {
    const { title, actions, content, onAnimationEnd, titleStyle } = this.props
    const footer = actions.map(button => {
      // tslint:disable-next-line:only-arrow-functions
      const orginPress = button.onPress || function () {}
      button.onPress = () => {
        const res = orginPress()
        if (res && res.then) {
          res.then(() => {
            this.onClose()
          })
        } else {
          this.onClose()
        }
      }
      return button
    })

    return (
      <Modal
        transparent
        title={title}
        titleStyle={titleStyle}
        visible={this.state.visible}
        footer={footer}
        style={{ borderRadius: px2Dp(28) }}
        onAnimationEnd={onAnimationEnd}
        bodyStyle={{
          marginTop: 8,
          alignItems: 'center'
        }}
      >
        <ScrollView>{isValidElement(content) ? content : <Text>{content}</Text>}</ScrollView>
      </Modal>
    )
  }
}
