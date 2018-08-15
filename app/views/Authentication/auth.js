import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import Login from './login'

class Auth extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Login navigation={this.props.navigation}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default Auth
