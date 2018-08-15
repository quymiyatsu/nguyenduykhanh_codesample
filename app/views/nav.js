import React, { Component } from "react";
import { View, Text } from "react-native";

// React Navigation
import {
  createDrawerNavigator,
  DrawerItems,
  SafeAreaView
} from "react-navigation";
import CopyRightIcon from "react-native-vector-icons/MaterialCommunityIcons";
import FastImage from 'react-native-fast-image'
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import LookUp from "./Lookup/nav";

import QuoteScreen from "./Quotes/quotes";

import ProfileHeadScreen from "./Profile/headProfile";
import AboutScreen from '../views/About/about'
import ContactScreen from './Contact/contact'
import ContactNav from './Setting/nav'

import Constant from "../config/constant";
import {firstTime} from "../actions/app.action";


const DrawerContent = props => (
  <View
    style={{
      backgroundColor: "rgb(61, 64, 75)",
      height: 140
      // alignItems: "center",
      // justifyContent: "center"
    }}
  >
    {/* <Text style={{ color: "white", fontSize: 30 }}>THIS IS HEADER</Text>  */}
    <View
      style={{
        justifyContent: "center",
        height: 80,
      }}
    >
      <ProfileHeadScreen {...props}/>
    </View>

    <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
      <DrawerItems {...props} />

      <View
        style={{
          marginTop: Constant.layout.screenHeight / 2 - 90,
        }}
      >

      <FastImage
          source={require('../assests/images/logo/deer-silhouette.png')}
          style={{
            width: '45%',
            height: '45%',
            alignSelf: 'center',
            marginBottom: 5
          }}
          resizeMode={'contain'}
        />

        <View style={{
           flexDirection: "row",
           justifyContent: 'center',
           alignItems: 'center',
           marginBottom: 3,
        }}>
          <Text style={{
            color: Constant.color.white
          }}>Career Ladder</Text>
          <CopyRightIcon name={"copyright"} style={{
             fontSize: 15,
             color: Constant.color.white,
             textAlign: "center",
             marginLeft: 5,
             marginRight: 5,
          }} />
          <Text style={{
            color: Constant.color.white
          }}>SnowDeer</Text>

        </View>
        <Text style={{
             fontSize: 10,
             color: Constant.color.white,
             textAlign: 'center'
           }}>2018 All Rights Reserved</Text>
      </View>
    </SafeAreaView>
  </View>
);
export const AppNavigator = createDrawerNavigator(
  {
    LookUp: { screen: LookUp },
    Inspiration: { screen: QuoteScreen },
    About: { screen: AboutScreen },
    ContactNav: { screen: ContactNav }
  },
  {
    initialRouteName: "LookUp",
    headerMode: "none",
    drawerBackgroundColor: "rgb(61, 64, 75)",
    contentOptions: {
      activeTintColor: Constant.color.white,
      inactiveTintColor: Constant.color.white,
      activeBackgroundColor: "rgb(56, 59, 69)",
      inactiveBackgroundColor: "rgb(61, 64, 75)"
    },
    contentComponent: DrawerContent
  }
);

class AppWithNavigationState extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.props.firstTime()
  }

  render() {
    return <AppNavigator />;
  }
}

const mapStateToProps = state => ({
  app: state.get('app'),
});


const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      firstTime
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppWithNavigationState);
