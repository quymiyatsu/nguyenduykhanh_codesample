import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";
import SearchIcon from "react-native-vector-icons/Ionicons";

import LookupScreen from "./lookup";
import ProfileScreen from "../Profile/profile";
import ShareExperienceScreen from "../ShareExperience/shareExperience";
import ArticleScreen from "../Article/article";
import LoginScreen from "../Authentication/login";
import ExpertListScreen from './expertList'
import Constant from "../../config/constant";
import BecomeScreen from '../ShareExperience/become'


const LookupNavigator = createStackNavigator(
  {
    Lookup: { screen: LookupScreen },
    Profile: { screen: ProfileScreen },
    ShareExperience: { screen: ShareExperienceScreen },
    Article: { screen: ArticleScreen },
    Logins: { screen: LoginScreen },
    ExpertList: { screen: ExpertListScreen},
    Become: { screen: BecomeScreen }
  },
  {
    initialRouteName: "Lookup",
    headerMode: "none"
  }
);

class LookupNavigation extends Component {
 
  static router = LookupNavigator.router;

  static navigationOptions = ({ navigation, screenProps }) => ({
    title: "Look Up Professional",
    drawerIcon: (
      <SearchIcon
        name={"md-search"}
        style={{
          fontSize: 25,
          color: Constant.color.white
        }}
      />
    )
  });

  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <LookupNavigator navigation={this.props.navigation} />;
  }
}

export default LookupNavigation
