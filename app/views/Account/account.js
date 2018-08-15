import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import RightArrow from "react-native-vector-icons/Ionicons";
import LogOutIcon from "react-native-vector-icons/SimpleLineIcons";
import UserIcon from "react-native-vector-icons/FontAwesome";

import ScreenHeader from "../../components/ScreenHeader";
import { Container } from "../../components/Container";
import Constant from "../../config/constant";
import { logout } from "../../modules/auth.module";
import Header from "../../components/header";

class Account extends Component {
  renderUserName(userName) {
    if (userName.displayName !== undefined && userName.displayName.length > 0) {
      return <Text style={styles.logout}>{userName.displayName}</Text>;
    } 
    if (userName.email !== undefined) {
      return <Text style={styles.logout}>{userName.email}</Text>;
    }
  }

  isRenderLogout() {
    const { isUserLogin, typeOfLogin } = this.props.auth.toJS();
    if (!isUserLogin) {
      return (
        <View>
          <View style={styles.accountItemContainer}>
            {/* CREATE ACCOUNT */}
            <TouchableOpacity
              style={styles.accountItemWrapper}
              onPress={() => this.props.navigation.navigate("Register")}
            >
              <Text style={styles.accountName}>Create account</Text>
              <RightArrow name="ios-arrow-forward" style={styles.rightArrIco} />
            </TouchableOpacity>
          </View>

          {/* SIGN IN */}
          <View style={styles.accountItemContainer}>
            {/* CREATE ACCOUNT */}
            <TouchableOpacity
              style={styles.accountItemWrapper}
              onPress={() => this.props.navigation.navigate("Login")}
            >
              <Text style={styles.accountName}>Sign in</Text>
              <RightArrow name="ios-arrow-forward" style={styles.rightArrIco} />
            </TouchableOpacity>
          </View>
        </View>
      );
    } else {
      return (
        <View>
          {/* USER */}
          <View style={styles.accountItemContainer}>
            {typeOfLogin.map((user, index) => {
              return (
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('EditProfile')}
                  style={styles.accountItemWrapper}
                  key={index}
                >
                  <View style={{ flexDirection: "row", marginLeft: 5 }}>
                    <UserIcon name={"user"} style={styles.logoutIc} />
                    {this.renderUserName(user)}
                  </View>

                  <RightArrow
                    name="ios-arrow-forward"
                    style={styles.rightArrIco}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
          {/* CREATE ACCOUNT */}
          <View style={styles.accountItemContainer}>
            <TouchableOpacity
              onPress={() => this.props.logout()}
              style={styles.logoutWrapper}
            >
              <LogOutIcon name={"logout"} style={styles.logoutIc} />
              <Text style={styles.logout}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }

  renderLogout() {
    const { isUserLogin } = this.props.auth.toJS();
  }

  render() {
    return (
      <Container>
        <Header
           headerText={"Account"}
           navigation={this.props.navigation}
        />

        <View style={styles.accountContainer}>{this.isRenderLogout()}</View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  accountContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    flex: 1
  },
  accountItemContainer: {
    backgroundColor: Constant.color.white,
    marginTop: 10,
    marginBottom: 10
  },
  accountItemWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 5,
    marginLeft: 20,
    paddingTop: 8,
    paddingBottom: 8
  },
  accountName: {
    marginLeft: 15,
    fontSize: 17,
    color: Constant.color.greyDark
  },
  logoutIc: {
    fontSize: 18,
    color: Constant.color.theme
  },
  logoutWrapper: {
    flexDirection: "row",
    paddingTop: 5,
    marginLeft: 20,
    paddingTop: 10,
    paddingBottom: 10
  },
  logout: {
    marginLeft: 15,
    fontSize: 17,
    color: Constant.color.theme
  },
  rightArrIco: {
    marginRight: 10,
    fontSize: 22,
    color: Constant.color.grey
  }
});

const mapStateToProps = state => ({
  auth: state.get('auth'),
  profile: state.get('profile')
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      logout
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Account);
