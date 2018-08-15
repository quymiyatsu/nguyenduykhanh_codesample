import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import { Container } from '../../components/Container'
import Header from '../../components/header'
export default class Home extends Component {
    render() {
      return (
       <Container>
        <Header
          headerText={'Home'}
          navigation={this.props.navigation}
        />
       </Container>
      )
    }
}
