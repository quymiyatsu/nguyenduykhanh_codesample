import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import { Container } from '../../components/Container'
import Constant from "../../config/constant";

export default class Welcome extends Component {
  render() {
    return (
      <Container style={styles.container}>
        <Text style={styles.textWelcome}>Welcome Nam!</Text>
        <Text style={styles.text}>Please share something about you</Text>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Introduction')}
          style={styles.button}>
          <Text style={styles.textButton}>Sure</Text>
        </TouchableOpacity>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constant.color.theme,
    marginTop: Constant.layout.navPadding,
    alignItems: 'center',
  },
  textWelcome: {
    fontSize: 40,
    color: Constant.color.white,
    textAlign: 'center',
    marginTop: 150,
  },
  text: {
    fontSize: 20,
    color: Constant.color.white,
    textAlign: 'center',
    marginTop: 50,
  },
  textButton: {
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
  },
  button: {
    backgroundColor: Constant.color.white,
    paddingVertical: 10,
    paddingHorizontal: 50,
    width: 160,
    marginTop: 50,
    borderRadius: 5,
    elevation: 2,
    shadowColor: Constant.color.black,
    shadowOffset:{ width: 2,  height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  }
})
