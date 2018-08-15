import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
} from 'react-native';
import {connect, Provider} from 'react-redux'
import SplashScreen from 'react-native-splash-screen'

import createStore from './reducers/configureStore'
import Constant from './config/constant'
import AppNavigation from './views/nav';

const store = createStore()

export default class App extends Component {

  componentDidMount() {
    // do stuff while splash screen is shown
    // After having done stuff (such as async tasks) hide the splash screen
    if(Platform.OS === 'android')
      SplashScreen.hide();
  }

  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1, backgroundColor: Constant.color.white }}>
          <AppNavigation />
        </View>
      </Provider>
    );
  }
}



