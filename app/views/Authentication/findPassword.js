import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Container } from "../../components/Container";
import ScreenHeader from "../../components/ScreenHeader";
import Constant from "../../config/constant";

import { resetUserPassword } from "../../modules/auth.module";

class FindPassWord extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      isSendResetConfirm: false,
      errMessage: ""
    };
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      nextProps.auth.resetPasswordResponse !== null &&
      !nextProps.auth.isError
    ) {
      this.setState({ isSendResetConfirm: true })
    } else if (nextProps.auth.isError) {
      this.setState({
        errMessage: nextProps.auth.resetPasswordResponse.code,
        isSendResetConfirm: false,
      })
    }
  }
  resetForm() {
    this.setState({
      email: '',
      isSendResetConfirm: false,
    })
  }

  renderResetConfirm() {
    if (this.state.isSendResetConfirm) {
      return Alert.alert(
        'Attention',
        'We have just sent a password reissue mail. Please continue with the URL described in the email',
        [
          {
            text: ('ok'),
            onPress: () => this.resetForm(),
          },
        ]
      )
    }
  }

  isRequestingResetPassword() {
    const { isResetPassword } = this.props.auth
    if (isResetPassword) {
      return <ActivityIndicator size="small" style={styles.activityIndicator} />
    }
    return null
  }

  renderErrorMessage() {
    if (
      this.state.errMessage === 'auth/user-not-found' ||
      this.state.errMessage === 'auth/email-not'
    ) {
      return (
        <View style={styles.errMessWrapper}>
          <Text style={styles.errMess}>
            User does not exist
          </Text>
        </View>
      )
    }
    if (this.state.errMessage === 'auth/invalid-email') {
      return (
        <View style={styles.errMessWrapper}>
          <Text style={styles.errMess}>
           email should follow the format youremail@example.com
          </Text>
        </View>
      )
    }
  }

  render() {
    return (
      <Container>
        <ScreenHeader
          headerTitle={"Find Password"}
          hiddenBackButton
          nav={this.props.navigation}
        />
        <View style={styles.findPassContainer}>
        {this.isRequestingResetPassword()}
        {this.renderResetConfirm()}
          <View style={styles.textInputWrp}>
            <TextInput
              placeholder={"youremail@example.com"}
              placeholderTextColor={Constant.color.grey}
              style={styles.textInput}
              onChangeText={email => this.setState({ email })}
              value={this.state.email.toLowerCase()}
              blurOnSubmit
              underlineColorAndroid={'transparent'}
            />
           
          </View>
          {this.renderErrorMessage()}
          <TouchableOpacity
            style={styles.findPasswordBtn}
            onPress={() => this.props.resetUserPassword(this.state.email)}
          >
            <Text style={styles.findTxt}>Find</Text>
          </TouchableOpacity>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  findPassContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    flex: 1
  },
  textInputWrp: {
    marginTop: 10,
    backgroundColor: Constant.color.white
  },
  textInput: {
    paddingTop: 8,
    paddingBottom: 8,
    marginLeft: 10,
    color: Constant.color.greyDark
  },
  findPasswordBtn: {
    backgroundColor: "rgb(203, 52, 92)",
    marginLeft: Constant.layout.screenHeight / 2.5,
    marginRight: 20,
    marginTop: 15,
    paddingTop: 3,
    paddingBottom: 3,
    borderRadius: 3
  },
  findTxt: {
    color: Constant.color.white,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16
  },
  activityIndicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errMessWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  errMess: {
    color: Constant.color.red,
    fontSize: 13,
    textAlign: 'center',
  },
});

const mapStateToProps = state => ({
  auth: state.get('auth')
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      resetUserPassword
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FindPassWord);
