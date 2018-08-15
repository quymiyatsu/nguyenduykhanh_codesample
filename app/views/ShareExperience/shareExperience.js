import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import { Container } from '../../components/Container'
import Constant from "../../config/constant";
import Header from '../../components/header';

export default class ShareExperience extends Component {
  render() {
    return (
      <Container style={styles.container}>
      <Header
          navigation={this.props.navigation}
          isFromExpertList
        />
        <Text style={styles.textWelcome}>I want to share about</Text>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Become')}
          style={styles.button}>
          <Text style={styles.textButton}>How I become ...</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('')}
          style={styles.button}>
          <Text style={styles.textButton}>My career path</Text>
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
    paddingHorizontal: 50,
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
    elevation: 5,
    shadowColor: Constant.color.black,
    shadowOffset:{ width: 2,  height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  }
})
