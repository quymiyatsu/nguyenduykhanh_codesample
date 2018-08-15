import React, { PureComponent } from 'react'
import { View, StyleSheet } from 'react-native'

import Constant from '../config/constant'

class Container extends PureComponent {
  render() {
    const { children, style } = this.props
    return <View style={[styles.container, style]}>{children}</View>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constant.color.white,
  },
})

export { Container }
