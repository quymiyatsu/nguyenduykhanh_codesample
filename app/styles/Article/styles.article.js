import { StyleSheet } from "react-native";
import Constant from "../../config/constant";

const styles = StyleSheet.create({
  headerWrapper: {
    backgroundColor: Constant.color.theme,
    flex: 2.8
  },
  creatorWrapper: {
    flexDirection: "row",
    marginTop: 45,
    marginLeft: 20
  },
  creatorImgWrapper: {
    width: "10%",
    height: "82%",
    marginBottom: -70
  },
  creatorImg: {
    width: "100%",
    height: "100%",
    borderRadius: 18
  },
  creatorTxtWrapper: {
    marginLeft: 5
  },
  creatorName: {
    color: Constant.color.white,
    fontSize: 13
  },
  creatorTitle: {
    color: Constant.color.whiteShade,
    fontSize: 10,
    marginTop: 2
  },
  titleWrapper: {
    marginLeft: 20,
    width: "60%"
  },
  title: {
    fontSize: 30,
    color: Constant.color.white
  },
  titleDateWrapper: {
    marginLeft: 20,
    marginTop: 5,
    paddingBottom: 20
  },
  titleDate: {
    color: Constant.color.whiteShade,
    fontSize: 10
  },
  contentWrapper: {
    flex: 6,
    backgroundColor: Constant.color.white
  },
  introductionWrapper: {
    marginLeft: 20,
    marginTop: 20
  },
  introduction: {
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 1
  },
  introductionContent: {
    lineHeight: 25,
    marginRight: 20,
    letterSpacing: 0.5,
    marginTop: 5,
    color: Constant.color.greyDark
  },
  commentWrapper: {
    marginTop: 20,
    marginLeft: 20,
    flexDirection: "row"
    // borderStyle: 'solid',
    //     borderColor: 'rgb(242, 242, 242)',
    //     borderWidth: 1,
    //     borderRadius: 5
  },
  comment: {
    backgroundColor: "rgb(242, 242, 242)",
    color: Constant.color.greyDark,
    fontSize: 12,
    paddingTop: 2,
    paddingRight: 4,
    paddingBottom: 2,
    paddingLeft: 4,
    marginRight: 10
  },

  articleReactioWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    borderStyle: "solid",
    borderBottomColor: Constant.color.grey,
    borderBottomWidth: 2,
    paddingBottom: 10
  },
  heartOff: {
    fontSize: 24,
    marginTop: 6
  },
  heartOn: {
    fontSize: 24,
    marginTop: 6,
    color: Constant.color.red
  },
  reactionRightWrapper: {
    flexDirection: "row",
    marginTop: 8
  },
  conmmentIcon: {
    fontSize: 22,
    color: Constant.color.greyDark
  },
  commentCount: {
    fontSize: 12,
    color: Constant.color.greyDark,
    marginLeft: 3
  },
  shareIcon: {
    fontSize: 17,
    marginLeft: 15
  },
  commentContainer: {
    marginLeft: 20,
    marginRight: 20
  },
  commentTxt: {
    fontSize: 18,
    marginBottom: 10
  },
  commentBoxWrapper: {
    backgroundColor: Constant.color.white,
    borderStyle: "solid",
    borderRadius: 4,
    borderColor: Constant.color.grey,
    borderWidth: 0.8,
    shadowColor: "rgba(0, 0, 0, 0.4)",
    shadowOffset: {
      width: 1,
      height: 1
    },
    shadowOpacity: 0.2,
    elevation: 3,
    marginBottom: 10,
    height: 70
  },
  commentTextInput: {
    fontSize: 13,
    color: Constant.color.greyDark,
    marginTop: 5,
    marginLeft: 10,
    letterSpacing: 1.5,
    width: "90%"
  },

  commentListContainer: {
    backgroundColor: Constant.color.white,
    borderStyle: "solid",
    borderRadius: 4,
    borderColor: Constant.color.grey,
    borderWidth: 0.7,
    shadowColor: "rgba(0, 0, 0, 0.4)",
    shadowOffset: {
      width: 1,
      height: 1
    },
    shadowOpacity: 0.2,
    elevation: 3,
    marginBottom: 10
  },
  commentListWrapper: {
    flexDirection: "row",
    marginTop: 8,
    marginLeft: 8
  },
  commentorWrapper: {
  
  },
  commentorImg: {
    width: "85%",
    height: "22%",
    borderRadius: 20
  },
  commentContentWrapper: {
    flex: 9
  },
  commentorName: {
    color: Constant.color.theme,
    marginBottom: 2,
    fontSize: 15
  },
  commentDate: {
    color: Constant.color.grey,
    marginBottom: 5,
    fontSize: 10
  },
  commentContent: {
    lineHeight: 22,
    color: Constant.color.greyDark,
    letterSpacing: 0.5,
    fontSize: 13
  },
  commentReadmoreTxt: {
    lineHeight: 22,
    color: Constant.color.grey,
    fontSize: 12,
    alignSelf: 'flex-end',
  },
  heartOffs: {
    fontSize: 16,
  },
  activityIndicator: {
    position: "absolute",
    top: Constant.layout.screenHeight / 2,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center"
  },
  postCommentWrapper: {
    marginBottom: 30,
    alignSelf: "flex-end",
    backgroundColor: Constant.color.theme,
    borderRadius: 3,
    paddingTop: 5,
    paddingRight: 15,
    paddingBottom: 5,
    paddingLeft: 15
  },
  postText: {
    color: Constant.color.white
  },
  leftArrow: {
    justifyContent: "center",
    position: "absolute",
    top: 10,
    right: 0,
    left: 10,
    color: Constant.color.white,
    fontSize: 20,
    paddingTop: 2,
    paddingRight: 2,
    paddingBottom: 2,
    paddingLeft: 2
  },
  commentWrapper: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20
  },
  replyWrapper: {
    marginLeft: 5,
    marginTop: 2
  },
  replyTxt: {
    fontSize: 11,
    color: Constant.color.theme
  },
  duration: {
    fontSize: 11,
    color: Constant.color.theme,

    marginTop: 2
  },

  commentActionWrapper: {
    marginTop: 10,
    marginBottom: 5,
    flexDirection: "row"
  },
  replyContainer: {
    flexDirection: "row"
  },

  subArrow: {
    color: Constant.color.theme,
    fontSize: 13,
    marginLeft: 25
  },
  replyTextInputWrapper: {
    width: "80%",
    borderStyle: "solid",
    borderWidth: 0.5,
    borderColor: Constant.color.grey,
    marginBottom: 10,
    borderRadius: 4,
    paddingBottom: 3
    // paddingTop: 3
  },
  replyTextInput: {
    color: Constant.color.greyDark,
    marginTop: 2,
    marginLeft: 5,
    width: "90%",
    fontSize: 11
  },
  sendIcWrapper: {
    marginLeft: 5,
    marginTop: 3
  },
  sendIc: {
    color: Constant.color.theme,
    fontSize: 15
  }
});

export default styles;
