import { StyleSheet } from "react-native";
import Constant from "../../config/constant";

const styles = StyleSheet.create({
  signInText: {
    color: Constant.color.white,
    textAlign: "center",
    fontSize: 17
  },
  signInWrapper: {
    backgroundColor: Constant.color.theme,
    marginLeft: 40,
    marginRight: 30,
    height: 40,
    justifyContent: "center",
    marginTop: 10
  },
  container: {
    flex: 1
  },
  beachImg: {
    width: "100%",
    height: "50%"
  },
  rectangleImg: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 200
  },
  forgotPassWrapper: {
    flexDirection: "row",
    alignSelf: "flex-end",
    marginRight: 28,
    marginTop: 10
  },
  forgotText: {
    color: Constant.color.greyDark,
    fontSize: 12
  },
  icon: {
    margin: 10
  },
  emailText: {
    color: Constant.color.grey,
    width: "30%",
    marginBottom: 8,
    letterSpacing: 1.5,
    fontSize: 13
  },
  textInput: {
    width: "90%",
    color: Constant.color.greyDark,
    fontSize: 13,
    borderStyle: "solid",
    borderBottomColor: "#9B9B9B",
    borderBottomWidth: 0.5,
    paddingBottom: 10
  },
  userWrapper: {
    marginLeft: 40,
    justifyContent: "center"
  },
  errorWrapper: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 5,
    paddingBottom: 5
  },
  errorMess: {
    color: Constant.color.red,
    fontSize: 11
  },
  loginBtn: {
    width: "100%",
    paddingRight: 20,
    paddingBottom: 20,
    paddingLeft: 20
  },
  socialIconWrp: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  loginFacebookWrapper: {
    flexDirection: "row",
    backgroundColor: Constant.color.facebook,
    height: 25,
    width: Constant.layout.screenWidth / 2 - 15,
    alignItems: "center"
  },
  facebookIcon: {
    color: Constant.color.white,
    fontSize: 17,
    marginLeft: 5
  },
  fbText: {
    color: Constant.color.white,
    fontSize: 12,
    marginLeft: 5
  },
  ggIcon: {
    color: Constant.color.white,
    fontSize: 17,
    marginLeft: 6
  },
  ggText: {
    color: Constant.color.white,
    fontSize: 12,
    marginLeft: 6
  },
  orText: {
    textAlign: "center",
    color: "rgba(0, 0, 0, 0.5)",
    marginTop: 10
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30
  },
  askAccount: {
    fontSize: 10,
    color: "rgba(0, 0, 0, 0.5)"
  },
  signUpTxt: {
    fontSize: 10,
    marginLeft: 5,
    fontWeight: "bold",
    color: "rgba(0, 0, 0, 0.8)"
  },
  activityIndicator: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 200,
    justifyContent: "center",
    alignItems: "center"
  },
  errorWrapper: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 5
  },
  errorMess: {
    color: Constant.color.red,
    fontSize: 12
  },
  wrapLine: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginLeft: 40,
    marginRight: 30,
    marginBottom: 10
  },
  line: {
    borderBottomColor: Constant.color.textDisable,
    borderBottomWidth: 0.5,
    alignSelf: "center",
    width: "100%"
  },
  text: {
    position: "absolute",
    padding: 10,
    fontSize: 12,
    backgroundColor: Constant.color.backgroundSNS,
    color: Constant.color.textDisable,
    justifyContent: "center"
  },
  leftArr: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 20,
    right: 0,
    left: 5,
    color: Constant.color.shadow,
    paddingTop: 2,
    paddingRight: 2,
    paddingBottom: 2,
    paddingLeft: 2
  }
});

export default styles;
