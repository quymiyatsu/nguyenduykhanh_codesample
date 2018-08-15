import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  Animated,
  KeyboardAvoidingView,
  ActivityIndicator,
  StyleSheet,
  Platform,
} from "react-native";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import FastImage from "react-native-fast-image";
import FacebookIcon from "react-native-vector-icons/Entypo";
import LeftArrow from "react-native-vector-icons/Feather";

import ArrowRight from "react-native-vector-icons/EvilIcons";

import Constant from "../../config/constant";
import styles from "../../styles/Auth/login.styles";

import {
  logInWithEmailPassword,
  logInWithFacebook,
} from "../../modules/auth.module";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loginErrorMess: ""
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.auth.toJS().isLoginSuccess) {
      this.props.navigation.navigate("Lookup", { isFromLogin: true });
      this.resetForm();
    } else if (Object.keys(nextProps.auth.toJS().userInfo).length > 0) {
      if (nextProps.auth.toJS().userInfo.code) {
        this.setState({ loginErrorMess: nextProps.auth.toJS().userInfo.code });
      }
    }
  }

  /**
  |--------------------------------------------------
  | Reset form
  |--------------------------------------------------
  */

  resetForm() {
    this.setState({
      email: "",
      password: "",
      loginErrorMess: ""
    });
  }

  /**
  |--------------------------------------------------
  | Erorr Message Handle
  |--------------------------------------------------
  */
  renderErrorMessage() {
    if (this.state.loginErrorMess === "auth/user-not-found") {
      return (
        <View style={styles.errorWrapper}>
          <Text style={styles.errorMess}>
            Email should follow the format youremail@example.com
          </Text>
        </View>
      );
    } else if (this.state.loginErrorMess === "auth/invalid-email") {
      return (
        <View style={styles.errorWrapper}>
          <Text style={styles.errorMess}>
            User does not exist. Please try again!
          </Text>
        </View>
      );
    } else if (this.state.loginErrorMess === "auth/wrong-password") {
      return (
        <View style={styles.errorWrapper}>
          <Text style={styles.errorMess}>
            Password is not correct. Please try again!
          </Text>
        </View>
      );
    }
  }

  /**
  |--------------------------------------------------
  | Email Input Field
  |--------------------------------------------------
  */
  renderEmailInput() {
    return (
      <View style={styles.userWrapper}>
        <Text style={styles.emailText}>{"EMAIL"}</Text>
        {/* USER ID FIELD */}
        <TextInput
          placeholder={"youremail@example.com"}
          placeholderTextColor={Constant.color.greyDark}
          style={styles.textInput}
          onChangeText={email => this.setState({ email })}
          value={this.state.email.toLowerCase()}
          blurOnSubmit
          underlineColorAndroid={"transparent"}
        />
      </View>
    );
  }

  /**
  |--------------------------------------------------
  | Password Input Field
  |--------------------------------------------------
  */
  renderPasswordInput() {
    return (
      <View style={styles.userWrapper}>
        <Text style={[styles.emailText, { marginTop: 30 }]}>{"PASSWORD"}</Text>
        {/* USER ID FIELD */}
        <TextInput
          placeholder={"password"}
          placeholderTextColor={Constant.color.greyDark}
          style={styles.textInput}
          onChangeText={password => this.setState({ password })}
          value={this.state.password.toLowerCase()}
          blurOnSubmit
          underlineColorAndroid={"transparent"}
          secureTextEntry
        />
      </View>
    );
  }

  /**
  |--------------------------------------------------
  | Forgot Password Button
  |--------------------------------------------------
  */
  renderForgotPassword() {
    return (
      <TouchableOpacity
        style={styles.forgotPassWrapper}
        onPress={() => this.props.navigation.navigate("FindPassword")}
      >
        <Text style={styles.forgotText}>forgot password</Text>
        <ArrowRight
          name={"chevron-right"}
          style={{
            alignSelf: "center",
            fontSize: 20
          }}
        />
      </TouchableOpacity>
    );
  }

  /**
  |--------------------------------------------------
  | Sign in Button
  |--------------------------------------------------
  */
  renderSignInBtn() {
    return (
      <TouchableOpacity
        style={styles.signInWrapper}
        onPress={() => {
          this.props.logInWithEmailPassword(
            this.state.email,
            this.state.password
          );
        }}
      >
        <Text style={styles.signInText}>SIGN IN</Text>
      </TouchableOpacity>
    );
  }

  /**
  |--------------------------------------------------
  | Facebook Button
  |--------------------------------------------------
  */
  renderFacebookBtn() {
    return (
      <TouchableOpacity
        style={styles.loginFacebookWrapper}
        onPress={() => {
          this.props.logInWithFacebook();
        }}
      >
        <FacebookIcon name="facebook" style={styles.facebookIcon} />
        <Text style={styles.fbText}>Continue with facebook</Text>
      </TouchableOpacity>
    );
  }

  /**
  |--------------------------------------------------
  | Render Footer
  |--------------------------------------------------
  */
  renderFooter() {
    return (
      <View style={styles.footer}>
        <Text style={styles.askAccount}>DON'T HAVE ACCOUNT?</Text>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Register")}
        >
          <Text style={styles.signUpTxt}>SIGN UP</Text>
        </TouchableOpacity>
      </View>
    );
  }

  /**
  |--------------------------------------------------
  | Render Component
  |--------------------------------------------------
  */
  render() {
    const { isLogin } = this.props.auth.toJS();
    const { params } = this.props.navigation.state;
    return (
      <View style={styles.container}>
        <FastImage
          source={require("../../assests/images/bea.jpeg")}
          style={styles.beachImg}
        />
          <LeftArrow
            name="arrow-left"
            size={20}
            style={styles.leftArr}
            onPress={() => this.props.navigation.goBack()}
          />

        <FastImage
          source={require("../../assests/images/rectangle.png")}
          style={styles.rectangleImg}
        />

        <KeyboardAvoidingView style={{ marginTop: -80}} behavior={'padding'}>
          {/* EMAIL */}
          {this.renderEmailInput()}
          {this.renderErrorMessage()}
          {isLogin && (
            <ActivityIndicator size="small" style={styles.activityIndicator} />
          )}
          {/* PASSWORD */}
          {this.renderPasswordInput()}

          {/* FORGOT PASSWORD */}
          {this.renderForgotPassword()}

          {/* SIGNIN BTN */}
          {this.renderSignInBtn()}
          <View style={styles.wrapLine}>
            <View style={styles.line} />
            <Text style={styles.text}>OR</Text>
          </View>
          <View style={styles.socialIconWrp}>
            {/* FACEBOOK LOGIN  */}
            {this.renderFacebookBtn()}

          </View>

          {/* FOOTER */}
          {this.renderFooter()}
        </KeyboardAvoidingView>

        
      </View>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.get("auth"),
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      logInWithEmailPassword,
      logInWithFacebook,
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
