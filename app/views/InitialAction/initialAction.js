import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import { Container } from '../../components/Container'
import Constant from "../../config/constant";

export default class InitialAction extends Component {
  render() {
    return (
      <Container style={styles.container}>
        <Text style={styles.textWelcome}>Thank you!</Text>
        <Text style={styles.text}>What do you want to do</Text>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('ShareExperience')}
          style={styles.button}>
          <Text style={styles.textButton}>Share experience</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Lookup')}
          style={styles.button}>
          <Text style={styles.textButton}>Look up professionals</Text>
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
    marginTop: 100,
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
    width: 300,
    marginTop: 50,
    borderRadius: 5,
    elevation: 2,
    shadowColor: Constant.color.black,
    shadowOffset:{ width: 2,  height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  }
})
