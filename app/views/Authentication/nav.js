import { createStackNavigator } from 'react-navigation'

import AuthScreen from './auth';
import LoginScreen from './login'
import RegisterScreen from './register'
import FindPasswordScreen from './findPassword'
import IntroductionScreen from '../Introduction/introduction'
import LookupScreen from '../Lookup/lookup'

const AuthNavigator = createStackNavigator({
    Auth: { screen: AuthScreen },
    Login: { screen: LoginScreen },
    Register: { screen: RegisterScreen },
    FindPassword: { screen: FindPasswordScreen },
    Introduction: { screen: IntroductionScreen},
    Lookup: { screen: LookupScreen }
}, {
    initialRouteName: 'Auth',
    headerMode: 'none',
})

export default AuthNavigator