import { StyleSheet } from "react-native";
import Constant from "../../config/constant";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constant.color.white
  },
  inputWrapper: {
    flexDirection: "row",
    marginTop: 20,
    borderStyle: "solid",
    borderColor: Constant.color.theme,
    borderWidth: 2,
    borderRadius: 5,
    marginLeft: 20,
    marginRight: 20,
    height: 35
  },
  searchIcon: {
    fontSize: 22,
    color: Constant.color.theme,
    marginLeft: 8,
    alignSelf: "center",
    marginTop: 3
  },
  input: {
    marginLeft: 8,
    color: Constant.color.theme,
    height: 35,
    width: "100%"
  },

  tabWrapper: {
    flexDirection: "row",
    marginTop: 20,
    borderStyle: "solid",
    borderColor: Constant.color.theme,
    borderWidth: 1.5,
    marginLeft: 50,
    marginRight: 50,
    borderRadius: 4
  },
  tab: {
    flex: 5,
    paddingTop: 7,
    paddingBottom: 7
  },
  expertContainer: {
    marginLeft: 20,
    flexDirection: "row",
    marginBottom: 25,
    flex: 1
  },
  avatarImgWrapper: {
    width: "0%",
    height: "95%",
    flex: 2.5,
    marginRight: 10
  },
  avatarImg: {
    width: "100%",
    height: "100%",
    borderRadius: 50
  },
  expertDesWrapper: {
    flex: 8,
    alignSelf: "center",
    marginRight: 5
  },
  expertNameWrp: {
    flexDirection: "row",
  },
  expertName: {
    color: Constant.color.darkBlue,
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 5
  },
  industryName: {
    marginLeft: 10,
    borderStyle: "solid",
    borderColor: Constant.color.grey,
    borderWidth: 0.5,
    borderRadius: 3,
    fontSize: 10,
    alignSelf: "flex-start",
    paddingTop: 2,
    paddingRight: 2.5,
    paddingBottom: 2,
    paddingLeft: 2.5,
    color: Constant.color.greyDark,
  },
  expertTitle: {
    color: Constant.color.blueLighShade,
    fontSize: 13
  },
  expertDescription: {
    marginTop: 8,
    lineHeight: 20,
    color: Constant.color.darkBlue,
    fontSize: 13
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

  areaWrapper: {
    backgroundColor: Constant.color.white,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    paddingTop: 13,
    paddingBottom: 13,
    borderRadius: 3,
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "rgba(0, 0, 0, 0.4)",
    shadowOffset: {
      width: 1,
      height: 1
    },
    shadowOpacity: 0.3,
    elevation: 3
  },
  areaName: {
    color: "rgba(0, 0, 0, 0.6)",
    textAlign: "center",
    fontSize: 17,
    width: "80%"
  },
  expertCount: {
    color: "rgba(0, 0, 0, 0.6)",
    textAlign: "center",
    fontSize: 10,
    marginTop: 2
  },
  penIcWrapper: {
    position: "absolute",
    bottom: 30,
    right: 15,
    backgroundColor: "rgb(203, 52, 92)",
    paddingTop: 12,
    paddingRight: 14,
    paddingBottom: 12,
    paddingLeft: 14,
    borderRadius: 35,
    shadowColor: "rgba(0, 0, 0, 0.4)",
    shadowOffset: {
      width: 2,
      height: 5
    },
    shadowOpacity: 0.3,
    elevation: 3
  },
  penIc: {
    color: Constant.color.white,
    fontSize: 30
  },
  separator: {
    borderStyle: "solid",
    borderBottomColor: Constant.color.grey,
    borderBottomWidth: 0.5,
    marginLeft: 20,
    marginBottom: 15
  }
});

export default styles;
