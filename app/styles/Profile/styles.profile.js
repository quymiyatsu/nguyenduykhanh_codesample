import { StyleSheet } from "react-native";
import Constant from "../../config/constant";

const styles = StyleSheet.create({
  headerContainer: {
    flex: 2.5
  },
  headerImgWrapper: {
    width: "100%",
    height: "100%"
  },
  headerImg: {
    width: "100%",
    height: "100%"
  },

  headerTopWrapper: {
    zIndex: 99999,
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    top: 22,
    right: 0,
    left: 0
  },

  profileText: {
    textAlign: "center",
    fontSize: 18,
    color: Constant.color.white
  },
  menuIcon: {
    alignSelf: "center",
    paddingLeft: 10,
    fontSize: 25,
    color: Constant.color.white
  },
  settingIcon: {
    color: Constant.color.white,
    fontSize: 22,
    marginRight: 10
  },
  headerFooterWrapper: {
    zIndex: 99999,
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    right: 0,
    left: Constant.layout.screenWidth / 6,
    bottom: -25,
    width: "22%",
    height: "43%"
  },

  followMessageWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20
  },
  followerWrapper: {
    marginBottom: 20
  },
  followerCount: {
    color: Constant.color.white,
    textAlign: "center"
  },

  followerTxt: {
    color: Constant.color.white
  },

  userAvatar: {
    width: "100%",
    height: "100%",
    alignSelf: "center",
    borderRadius: 40,
    borderWidth: 2,
    borderColor: Constant.color.white,
    marginLeft: 20,
    marginRight: 20
  },

  followerPostWrapper: {
    marginBottom: 20
  },
  postCount: {
    color: Constant.color.white,
    textAlign: "center"
  },
  postText: {
    color: Constant.color.white
  },

  profileContentContainer: {
    flex: 6,
    marginTop: 30
  },

  userName: {
    textAlign: "center",
    color: Constant.color.greyDark,
    fontSize: 22
  },
  userDescription: {
    color: Constant.color.grey,
    marginTop: 10,
    fontSize: 15,
    marginLeft: 30,
    marginRight: 30,
    textAlign: "center",
    letterSpacing: 0.5
  },

  followWrapper: {
    paddingTop: 5,
    paddingRight: 10,
    paddingBottom: 5,
    paddingLeft: 10,
    shadowColor: "#4A90E2",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.6,
    elevation: 3,
    borderRadius: 20,
    flex: 3,
    marginLeft: 30,
    marginRight: 20
  },
  followUserTxt: {
    fontSize: 17,
    textAlign: "center"
  },
  messageWrapper: {
    paddingTop: 5,
    paddingRight: 30,
    paddingBottom: 5,
    paddingLeft: 30,
    backgroundColor: Constant.color.white,
    shadowColor: "#4A90E2",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.6,
    elevation: 3,
    borderRadius: 20,
    flex: 2,
    marginLeft: 10,
    marginRight: 30
  },
  messageTxt: {
    color: "#4A90E2",
    fontSize: 17,
    textAlign: "center"
  },
  profilePostWrapper: {
    flexDirection: "row",
    marginTop: 20,
    borderStyle: "solid",
    borderTopColor: "rgb(151, 151, 152)",
    borderTopWidth: 0.3,
    justifyContent: "center"
  },
  profileTab: {
    flex: 5,
    paddingTop: 5,
    borderStyle: "solid"
  },
  profileWrapper: {
    borderBottomWidth: 3,
    marginLeft: 70,
    marginRight: 70,
    paddingBottom: 5,
    flex: 5,
    paddingTop: 5,
    borderStyle: "solid"
  },
  prifileTabText: {
    textAlign: "center",
    fontSize: 18
  },
  postWrapper: {
    flex: 5,
    paddingTop: 5,
    marginLeft: 50,
    marginRight: 50,
    borderStyle: "solid",
    borderBottomWidth: 3
  },
  contentContainer: {
    backgroundColor: "#E6E6E6",
  },
  contentWrapper: {
    backgroundColor: Constant.color.white,
    height: Constant.layout.screenHeight / 2.5 - 10,
    marginTop: 6,
    marginRight: 6,
    marginLeft: 6,
    borderRadius: 4,
  },
  aboutMeTxt: {
    color: Constant.color.greyDark,
    marginTop: 10,
    marginLeft: 10,
    fontSize: 18,
    marginBottom: 10
  },
  aboutMedes: {
    marginLeft: 10,
    color: Constant.color.greyDark,
    marginRight: 20,
    lineHeight: 22,
    letterSpacing: 0.5
  },
  postContentWrapper: {
    flexDirection: "row",
    marginLeft: 10
  },
  postThumbnailWrapper: {
    width: "55%",
    height: "55%",
    flex: 4,
    marginRight: 10
  },
  postThumbnail: {
    width: "100%",
    height: "100%",
    marginTop: 7
  },
  postShortDesWrapper: {
    flex: 7,
    marginRight: 6
  },
  postTitle: {
    fontSize: 18,
    color: Constant.color.greyDark,
    fontWeight: "bold",
    letterSpacing: 0.5
  },
  postShortDes: {
    marginTop: 5,
    color: Constant.color.greyDark,
    fontSize: 12,
    letterSpacing: 0.5,
    lineHeight: 20
  },
  postReactionWrapper: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginRight: 15,
    marginTop: 10
  },
  postLikeWrapper: {
    flexDirection: "row",
    marginRight: 15
  },
  likeCount: {
    fontSize: 12,
    marginRight: 5,
    alignSelf: "center",
    color: Constant.color.greyDark
  },
  heartOff: {
    fontSize: 18,
    color: Constant.color.greyDark
  },
  postCommentWrapper: {
    flexDirection: "row",
  },
  commentCount: {
    fontSize: 12,
    marginRight: 5,
    alignSelf: "center",
    color: Constant.color.greyDark
  },
  commentIcon: {
    fontSize: 18,
    color: Constant.color.greyDark
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
  profileActivityIndicator: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30
  }
});

export default styles;
