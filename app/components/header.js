import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Constant from "../config/constant";
import MenuIcon from "react-native-vector-icons/Ionicons";
import LeftArrow from "react-native-vector-icons/Feather";

import { withNavigation, DrawerActions } from "react-navigation";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View style={[styles.header, this.props.style]}>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.dispatch(DrawerActions.openDrawer())
          }
        >
          {this.props.isFromExpertList ? (
            <LeftArrow
              name="arrow-left"
              style={{
                alignSelf: "center",
                paddingLeft: 10,
                fontSize: 25,
                color: Constant.color.white
              }}
              onPress={() => this.props.navigation.goBack()}
            />
          ) : (
            <MenuIcon name="md-menu" style={styles.menuIcon} />
          )}
        </TouchableOpacity>
        <Text style={styles.headerText}>{this.props.headerText}</Text>
        <View />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: Constant.layout.screenWidth,
    height: 65,
    backgroundColor: Constant.color.theme
  },
  menuIcon: {
    alignSelf: "center",
    paddingLeft: 10,
    fontSize: 25,
    color: Constant.color.white,
    paddingTop: 15,
  },
  headerText: {
    color: Constant.color.white,
    fontSize: 20,
    fontWeight: "bold",
    paddingRight: 30,
    paddingTop: 15,
  }
});

export default Header;
