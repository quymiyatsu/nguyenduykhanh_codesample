import React, { Component } from 'react'
import { createStackNavigator } from 'react-navigation'

import MailIcons from "react-native-vector-icons/MaterialIcons";
import ContactScreen from '../Contact/contact'
import AccountScreen from '../Account/account'
import LookupScreen from '../Lookup/lookup'
import LoginScreen from '../Authentication/login'
import Constant from '../../config/constant';
import EditProfileScreen from "../Profile/editProfile";
import RegisterScreen from '../Authentication/register'
import FindPasswordScreen from '../Authentication/findPassword'
import IntroductionScreen from '../Introduction/introduction';

const SettingNavigator = createStackNavigator({
    Account: { screen: AccountScreen },
    Lookup: { screen: LookupScreen },
    EditProfile: { screen: EditProfileScreen },
    Contact: { screen: ContactScreen },
    Login: { screen: LoginScreen },
    Register: { screen: RegisterScreen },
    FindPassword: { screen: FindPasswordScreen },
    Introduction: { screen: IntroductionScreen }
}, {
    initialRouteName: 'Contact',
    headerMode: 'none'
})

class SettingNavigation extends Component {
    static router = SettingNavigator.router
    
    static navigationOptions = ({ navigation, screenProps }) => ({
        title: "Contact",
        drawerIcon: <MailIcons name={'email'} style={{
            fontSize: 20,
            color: Constant.color.white
        }}/>
    });
    constructor(props) {
        super(props)
        this.state={}
    }
    render() {
        return <SettingNavigator navigation={this.props.navigation}/>
    }
}
export default SettingNavigation