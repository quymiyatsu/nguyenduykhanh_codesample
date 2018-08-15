import { StyleSheet } from 'react-native'
import Constant from '../config/constant'

export const NavigatorStyles = StyleSheet.create({
  headerWrapper: {
    flexDirection: 'row',
    height: 60,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
    backgroundColor: Constant.color.theme,
  },
  headerTextWrapper: {
    justifyContent: 'center',
    alignSelf: 'center',
    paddingVertical: 5,
    flex: 1,
  },
  headerText: {
    color: Constant.color.white,
    fontSize: 20,
    textAlign: 'center',
    marginLeft: -30,
    paddingTop: 5,
  },
  homeIconWrapper: {
    width: '10%',
    height: '100%',
    justifyContent: 'center',
    paddingTop: 5,
  },
  homeIcon: {
    width: '56%',
    height: '100%',
  },
  textButton: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    color: Constant.color.theme,
    paddingRight: 10,
    marginTop: 5,
  },
  wrapButton: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
})