import React, {PureComponent} from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import FastImage from 'react-native-fast-image'
import {StackActions} from 'react-navigation'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import LeftArrow from "react-native-vector-icons/Feather";


import {NavigatorStyles} from '../styles/styles.components'
import Constant from "../config/constant";

class ScreenHeader extends PureComponent {

  backBtnPress (nav) {
    nav.goBack()
  }

  goHomeBtn(nav) {
    nav.dispatch(StackActions.popToTop())
  }

  render() {
    const {
      headerTitle,
      nav,
      hiddenBackButton,
      hiddenActionButton,
    } = this.props
    return (
      <View style={NavigatorStyles.headerWrapper}>

        {hiddenBackButton &&
        <TouchableOpacity
          style={NavigatorStyles.homeIconWrapper}
          onPress={() => this.backBtnPress(nav)}
        >
          <LeftArrow
            name='arrow-left'
            size={20}
            color={Constant.color.white}
          />
        </TouchableOpacity>
        }

        <View style={NavigatorStyles.headerTextWrapper}>
          <Text style={NavigatorStyles.headerText}>
            {headerTitle}
          </Text>
        </View>

        {hiddenActionButton &&
          <TouchableOpacity
            style={NavigatorStyles.homeIconWrapper}
            onPress={() => {
              this.goHomeBtn(nav)
            }}
          >
            <Icon
              name='home'
              size={20}
              color={Constant.color.white}
            />
          </TouchableOpacity>
        }
      </View>
    )
  }
}

export default ScreenHeader