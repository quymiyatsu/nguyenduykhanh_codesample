// Dimensions
import { Platform, Dimensions } from 'react-native'

const isIphoneX = () => {
  const dimen = Dimensions.get('window')
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (dimen.height === 812 || dimen.width === 812)
  )
}

const getNavPadding = () => {
  if (isIphoneX()) {
    return 40
  } else if (
    Platform.OS === 'ios' &&
    Dimensions.get('window').height / Dimensions.get('window').width > 1.75
  ) {
    return 20
  }
  return 0
}

const Constant = {
  layout: {
    screenWidth: Dimensions.get('window').width,
    screenHeight: Dimensions.get('window').height,
    navHeight: Platform.OS !== 'ios' ? 54 : 64,
    navPadding: getNavPadding(),
    contentHeight: Dimensions.get('window').height - 64,
    tabBarIconSize: Platform.OS !== 'ios' ? 24 : 30,
  },
  color: {
    white: '#fff',
    whiteShade: 'rgba(255, 255, 255, 0.7)',
    shadow: '#000',
    facebook: 'rgb(64, 90, 147)',
    background: '#5990D5',
    gray: '#8c8c8c',
    theme: '#3B5998',
    grey: 'rgb(155, 155, 155)',
    greyDark: 'rgb(74, 74, 74)',
    red: '#FF2D00',
    backgroundSNS: '#fff',
    textDisable: 'rgba(0, 0, 0, 0.5)',
    blueShade: 'rgba(74, 144, 226, 0.5)',
    blueLighShade: 'rgba(0, 95, 182, 0.6)',
    darkBlue: 'rgb(0, 95, 182)',
  },
  storage: {
    firstTime: 'first_time',
  },
}

export default Constant
