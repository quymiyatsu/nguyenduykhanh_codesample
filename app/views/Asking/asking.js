import React, { Component } from 'react'
import { View, Text } from 'react-native'
import Header from '../../components/header'

export default class Asking extends Component {
  render() {
    return (
      <View>
        <Header
          headerText={'Asking'}
          navigation={this.props.navigation}
        />
          <Text>Asking</Text>
      </View>
    )
  }
};
