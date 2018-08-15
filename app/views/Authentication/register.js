import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ActivityIndicator,
  Alert,
  Platform,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  
} from "react-native";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import FastImage from "react-native-fast-image";
import CopyRightIcon from "react-native-vector-icons/MaterialCommunityIcons";
import PropTypes from "prop-types";

import { createUserWithEmailPassword } from "../../modules/auth.module";

import Constant from "../../config/constant";
import { Container } from "../../components/Container";
import ScreenHeader from "../../components/ScreenHeader";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      userName: "",
      passwordAgain: "",
      isPasswordMatch: PropTypes.bool,
      errorMessage: ""
    };
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.auth.toJS().isSendEmail && !nextProps.auth.toJS().isCreateError) {
      this.resetForm();
      this.props.navigation.navigate("Introduction");
    } else if (Object.keys(nextProps.auth.toJS().userInfo).length > 0) {
      if (nextProps.auth.toJS().userInfo.code) {
        this.setState({
          errorMessage: nextProps.auth.toJS().userInfo.code
        });
      }
    }
  }

  /**
  |--------------------------------------------------
  | VALIDATE FORM
  |--------------------------------------------------
  */
  componentDidUpdate(prevProps, prevState) {
    if (this.state.passwordAgain !== prevState.passwordAgain) {
      this.validateForm();
    }
  }
  validateForm() {
    if (this.state.password !== this.state.passwordAgain) {
      this.setState({
        isPasswordMatch: false
      });
    } else if (this.state.password === this.state.passwordAgain) {
      this.setState({
        isPasswordMatch: true
      });
    }
  }

  resetForm() {
    this.setState({
      email: "",
      password: "",
      passwordAgain: "",
      errorMessage: ""
    });
  }

  renderErrorMessage() {
    if (this.state.errorMessage === "auth/invalid-email") {
      return (
        <View style={styles.errorMessWrapper}>
          <Text style={styles.errMess}>
            Email should follow the format youremail@example.com
          </Text>
        </View>
      );
    } else if (this.state.errorMessage === "auth/email-already-in-use") {
      return (
        <View style={styles.errorMessWrapper}>
          <Text style={styles.errMess}>This email is already in use</Text>
        </View>
      );
    } else if (this.state.errorMessage === "auth/unknown") {
      return (
        <View style={styles.errorMessWrapper}>
          <Text style={styles.errMess}>Email can't be blank </Text>
        </View>
      );
    }
  }

  renderPasswordErr() {
    if (this.state.errorMessage === "auth/weak-password") {
      return (
        <View style={styles.errorMessWrapper}>
          <Text style={styles.errMess}>
            Password should be minimum 6 characters
          </Text>
        </View>
      );
    }
    if (!this.state.isPasswordMatch) {
      return (
        <View style={styles.errorMessWrapper}>
          <Text style={styles.errMess}>Password is not match</Text>
        </View>
      );
    }
  }

  render() {
    const { isCreateUser } = this.props.auth.toJS();
    return (
      <Container>
        <ScreenHeader
          headerTitle={"Create account"}
          hiddenBackButton
          nav={this.props.navigation}
        />
        <KeyboardAvoidingView style={styles.container} behavior={'padding'}>
          <View style={styles.logoWrapper}>
            <FastImage
              source={require("../../assests/images/3x/logo.png")}
              style={styles.logo}
              resizeMode={"contain"}
            />
            <Text style={styles.slogan}>Join the community</Text>
          </View>
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder={"youremail@example.vn"}
              placeholderTextColor={Constant.color.textDisable}
              style={styles.textInput}
              onChangeText={email => this.setState({ email })}
              value={this.state.email.toLowerCase()}
              keyboardType={"email-address"}
              blurOnSubmit
              underlineColorAndroid={"transparent"}
            />
          </View>
          {this.renderErrorMessage()}
          {isCreateUser && (
            <ActivityIndicator size="small" style={styles.activityIndicator} />
          )}

          <View style={[styles.inputWrapper, { marginTop: 15 }]}>
            <TextInput
              placeholder={"Password"}
              placeholderTextColor={Constant.color.textDisable}
              style={styles.textInput}
              onChangeText={password => this.setState({ password })}
              value={this.state.password.toLowerCase()}
              secureTextEntry
              blurOnSubmit
              underlineColorAndroid={"transparent"}
            />
          </View>
          <View style={[styles.inputWrapper, { marginTop: 15 }]}>
            <TextInput
              placeholder={"Type password again"}
              placeholderTextColor={Constant.color.textDisable}
              style={styles.textInput}
              onChangeText={passwordAgain => this.setState({ passwordAgain })}
              value={this.state.passwordAgain.toLowerCase()}
              secureTextEntry
              blurOnSubmit
              underlineColorAndroid={"transparent"}
            />
          </View>
          {this.renderPasswordErr()}
          <TouchableOpacity
            style={styles.createAccountWrapper}
            onPress={() => {
              this.props.createUserWithEmailPassword(
                this.state.email,
                this.state.password,
                this.state.userName
              );
            }}
          >
            <Text style={styles.createAccountTxt}>Create account</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>

        <View style={styles.footerWrapper}>
          <Text style={styles.teamName}>SnowDeer</Text>
          <CopyRightIcon name={"copyright"} style={styles.copyRight} />
          <Text style={styles.allRight}>2018 All Rights Reserved</Text>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 80
  },
  logoWrapper: {
    width: "60%",
    height: "50%",
    alignItems: "center",
    marginBottom: -60
  },
  logo: {
    width: "95%",
    height: "45%",
    marginBottom: 10
  },
  slogan: {
    color: Constant.color.greyDark,
    fontSize: 16,
    letterSpacing: 0.5
  },
  body: {
    backgroundColor: Constant.color.white,
    flex: 1
  },
  subContainer: {
    backgroundColor: "white",
    marginBottom: 1,
    marginTop: 1
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    paddingVertical: 10
  },
  inputWrapper: {
    marginLeft: 30,
    paddingVertical: 9,
    alignSelf: "flex-start",
    borderStyle: "solid",
    borderWidth: 0.5,
    borderColor: Constant.color.grey,
    width: "85%"
  },
  textInput: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    color: Constant.color.textDisable
  },
  line: {
    backgroundColor: Constant.color.background,
    height: 1
  },
  activityIndicator: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center"
  },
  registerWrapper: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
    borderColor: Constant.color.theme,
    borderWidth: 1
  },
  registerBtn: {
    fontSize: 17
  },
  createAccountWrapper: {
    backgroundColor: Constant.color.theme,
    marginTop: 20,
    width: "85%",
    paddingTop: 15,
    paddingBottom: 15,
    marginLeft: 5
  },
  createAccountTxt: {
    color: Constant.color.white,
    textAlign: "center",
    fontSize: 15
  },
  errorMessWrapper: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10
  },
  errMess: {
    color: Constant.color.red,
    fontSize: 12
  },
  footerWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 10,
    right: 0,
    left: 0
  },
  teamName: {
    fontSize: 12,
    color: Constant.color.greyDark,
    textAlign: "center"
  },
  copyRight: {
    fontSize: 14,
    color: Constant.color.greyDark,
    marginRight: 4,
    textAlign: "center"
  },
  allRight: {
    fontSize: 12,
    color: Constant.color.greyDark,
    textAlign: "center"
  }
});

const mapStateToProps = state => ({
  auth: state.get('auth')
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      createUserWithEmailPassword
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
