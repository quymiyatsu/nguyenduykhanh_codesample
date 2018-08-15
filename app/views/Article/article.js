import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  FlatList
} from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  distanceInWordsToNow,
  format,
  addSeconds,
  differenceInHours
} from "date-fns";

import FastImage from "react-native-fast-image";
import ViewMoreText from "react-native-view-more-text";
import Share from 'react-native-share';


import HeartOn from "react-native-vector-icons/Ionicons";
import HeartOff from "react-native-vector-icons/Ionicons";
import CommentIcon from "react-native-vector-icons/Octicons";
import ShareIcon from "react-native-vector-icons/SimpleLineIcons";
import LeftArrow from "react-native-vector-icons/Feather";
import SubArrowRight from "react-native-vector-icons/MaterialCommunityIcons";
import SendIcon from "react-native-vector-icons/MaterialCommunityIcons";

import moment from "moment";

import { Container } from "../../components/Container";
import Constant from "../../config/constant";
import styles from "../../styles/Article/styles.article";
import {
  likeArticle,
  unlikeArticle,
  createComment,
  fetchReplyComment,
  createReplyComment,
  getCommentIds,
  likeComment,
  unlikeComment
} from "../../modules/article.module";

class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      singleArticleData: [],
      commentData: [],
      replyCommentData: [],
      commentText: "",
      replyCommentText: "",
      isShowReply: false,
      commentID: 0,
      isActiveHeart: false,
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const singleArticleData = nextProps.article.singleArticleData.toJS();
    const commentData = nextProps.article.commentData.toJS();
    const replyCommentData = nextProps.article.replyCommentData.toJS();

    if (singleArticleData.length > 0) {
      this.setState({ singleArticleData });
    }
    if (commentData.length > 0) {
      this.setState({ commentData });
    }
    if (replyCommentData.length > 0) {
      this.setState({
        replyCommentData
      });
    }
    if (nextProps.article.toJS().commentId > 0) {
      this.setState({
        commentID: nextProps.article.toJS().commentId
      });
    }
  }

  componentWillUnmount() {
    this.props.getCommentIds(0);
  }

  resetForm() {
    this.setState({
      replyCommentText: '',
      commentText: ''
    })
  }

  renderViewMore(onPress) {
    return (
      <Text
        onPress={onPress}
        style={{
          fontSize: 12,

          color: Constant.color.theme
        }}
      >
        Read more
      </Text>
    );
  }
  renderViewLess(onPress) {
    return (
      <Text
        onPress={onPress}
        style={{
          fontSize: 12,
          color: Constant.color.theme
        }}
      >
        Read less
      </Text>
    );
  }

  renderReplyItem = item => {
    const replyItem = item.item;
    if (replyItem.commented_user.introduction !== null) {
      return (
        <View
          style={{
            flex: 1,
            marginBottom: 5,
            marginLeft: 30
          }}
        >
          <Text
            style={{
              fontSize: 13,
              color: Constant.color.theme
            }}
          >
            {replyItem.commented_user.introduction.full_name}
          </Text>
          <Text
            style={{
              color: Constant.color.greyDark,
              fontSize: 12
            }}
          >
            {replyItem.comment}
          </Text>;
        </View>
      );
    }
  };

  renderReplyCount(replyCount, commentItem) {
    const { accessTokenApi, isUserLogin } = this.props.auth.toJS();

    if (replyCount === 0) {
      return null;
    } else {
      return (
        <TouchableOpacity
          style={{
            marginLeft: 30,
            paddingBottom: 10
          }}
          onPress={() => {
            this.props.fetchReplyComment(
              commentItem.id,
              accessTokenApi,
              isUserLogin
            );
            this.setState({
              replyCommentData: []
            });
            this.props.getCommentIds(commentItem.id);
          }}
        >
          <Text
            style={{
              color: Constant.color.theme,
              textDecorationLine: "underline",
              fontSize: 12
            }}
          >
            {replyCount} {replyCount > 1 ? "replies" : "reply"}
          </Text>
        </TouchableOpacity>
      );
    }
  }

  renderCommentItem = item => {
    const commentItem = item.item;
    const { accessTokenApi, isUserLogin } = this.props.auth.toJS();
    const {
      isCreateReplyComment,
      isFetchReplyComment
    } = this.props.article.toJS();
    if (commentItem.commented_user.introduction !== null) {
      return (
        <View style={styles.commentListContainer}>
          <View style={styles.commentListWrapper}>
            {/* <View style={styles.commentorWrapper}>
              <FastImage
                source={require("../../assests/images/pic.jpg")}
                style={styles.commentorImg}
              />
            </View> */}

            <View style={styles.commentContentWrapper}>
              <Text style={styles.commentorName}>
                {commentItem.commented_user.introduction.full_name}
              </Text>

              <ViewMoreText
                numberOfLines={2}
                renderViewMore={this.renderViewMore}
                renderViewLess={this.renderViewLess}
                textStyle={{ width: "100%", color: Constant.color.greyDark }}
              >
                <Text style={{ width: "100%" }}>{commentItem.comment}</Text>
              </ViewMoreText>
              <View style={styles.commentActionWrapper}>
              <TouchableOpacity
                onPress={() => {
                  commentItem.is_liked ? this.props.unlikeComment(commentItem.id, accessTokenApi) : this.props.likeComment(commentItem.id, accessTokenApi)
                }}
              >
              {
                commentItem.is_liked ? (
                  <HeartOn name={"md-heart"} style={{
                    fontSize: 16,
                    color: Constant.color.red,
                  }} />
                ) : (
                  <HeartOff name={"md-heart-outline"} style={styles.heartOffs} />
                )
              }
               
              </TouchableOpacity>
               
                <TouchableOpacity
                  style={styles.replyWrapper}
                  onPress={() => {
                    this.props.fetchReplyComment(
                      commentItem.id,
                      accessTokenApi,
                      isUserLogin
                    );
                    this.setState({
                      replyCommentData: []
                    });
                    this.props.getCommentIds(commentItem.id);
                  }}
                >
                  <Text style={styles.replyTxt}>- Reply</Text>
                </TouchableOpacity>
              </View>
              {this.renderReplyCount(commentItem.comments_count, commentItem)}
              {/* REPLY BOX */}
              {commentItem.id === this.state.commentID && (
                <View>
                  <FlatList
                    data={this.state.replyCommentData}
                    renderItem={this.renderReplyItem}
                    keyExtractor={item => item.id.toString()}
                    extraData={this.state}
                    initialNumToRender={3}
                  />

                  <View style={styles.replyContainer}>
                    <SubArrowRight
                      name={"subdirectory-arrow-right"}
                      style={styles.subArrow}
                    />
                    <View style={styles.replyTextInputWrapper}>
                      <TextInput
                        placeholder={"Write a reply"}
                        placeholderTextColor={Constant.color.grey}
                        style={styles.replyTextInput}
                        multiline
                        onChangeText={replyText =>
                          this.setState({ replyCommentText: replyText })
                        }
                        value={this.state.replyCommentText}
                      />
                    </View>

                    <TouchableOpacity
                      style={styles.sendIcWrapper}
                      onPress={() => {
                        this.props.createReplyComment(
                          commentItem.id,
                          accessTokenApi,
                          this.state.replyCommentText
                        );
                        this.resetForm()
                      }}
                      disabled={this.state.replyCommentText.length === 0}
                    >
                      <SendIcon name={"send"} style={styles.sendIc} />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          </View>
        </View>
      );
    }
  };

  render() {
    const { singleArticleData } = this.state;
    const { accessTokenApi } = this.props.auth.toJS();
    const { isFetchSingleArticle, isCreateComment } = this.props.article.toJS();
    return (
      <ScrollView
        style={{
          backgroundColor: Constant.color.white
        }}
      >
        {isFetchSingleArticle && (
          <ActivityIndicator size={"small"} style={styles.activityIndicator} />
        )}
        {singleArticleData.length > 0 &&
          singleArticleData.map((article, index) => {            
            let shareOptions = {
              title: `${article.title}`,
              message:`${article.introduction} - ${article.journey} - ${article.challenges} - ${article.conclusion}`,
              url: `${article.image.medium}`,
              subject: `Share ${article.introduction.full_name}'s article` //  for email
            };

            const publishedAt = moment(article.created_at)
            const updatedAt = moment(article.updated_at);
            return (
              <View key={index}>
                <View style={styles.headerWrapper}>
                  <LeftArrow
                    name="arrow-left"
                    style={styles.leftArrow}
                    onPress={() => this.props.navigation.goBack()}
                  />
                  <View style={styles.creatorWrapper}>
                    <View style={styles.creatorImgWrapper}>
                      <FastImage
                        source={require("../../assests/images/pic.jpg")}
                        style={styles.creatorImg}
                      />
                    </View>

                    <View style={styles.creatorTxtWrapper}>
                      <Text style={styles.creatorName}>FullName</Text>
                      <Text style={styles.creatorTitle}>
                        Position - WorkPlace
                      </Text>
                    </View>
                  </View>
                  <View style={styles.titleWrapper}>
                    <Text style={styles.title}>{article.title}</Text>
                  </View>

                  <View style={styles.titleDateWrapper}>
                    <Text style={styles.titleDate}>
                      Published at {article.created_at} -
                      Last updated at {article.updated_at}
                    </Text>
                  </View>
                </View>

                {/* CONTENT */}

                <View style={styles.contentWrapper}>
                  <View>
                    <View style={styles.introductionWrapper}>
                      <Text style={styles.introduction}>I. Introduction</Text>
                      <Text style={styles.introductionContent}>
                        {article.introduction}
                      </Text>
                    </View>
                    <View style={styles.introductionWrapper}>
                      <Text style={styles.introduction}>II. My journey</Text>
                      <Text style={styles.introductionContent}>
                        {article.journey}
                      </Text>
                    </View>
                    <View style={styles.introductionWrapper}>
                      <Text style={styles.introduction}>III. Conclusion</Text>
                      <Text style={styles.introductionContent}>
                        {article.conclusion}
                      </Text>
                    </View>
                    {/* LIKE COMMENT COUNT AND SHARE */}
                    <View style={styles.articleReactioWrapper}>
                      <TouchableOpacity
                        onPress={() => {
                          !article.is_liked
                            ? this.props.likeArticle(article.id, accessTokenApi)
                            : this.props.unlikeArticle(
                                article.id,
                                accessTokenApi
                              );
                          this.setState({
                            isActiveHeart: !this.state.isActiveHeart
                          })
                        }}
                      >
                        {(article.is_liked || this.state.isActiveHeart) ? (
                          <HeartOn name={"md-heart"} style={styles.heartOn} />
                        ) : (
                          <HeartOff
                            name={"md-heart-outline"}
                            style={styles.heartOff}
                          />
                        )}
                      </TouchableOpacity>

                      <View style={styles.reactionRightWrapper}>
                        <CommentIcon
                          name={"comment"}
                          style={styles.conmmentIcon}
                        />
                        <Text style={styles.commentCount}>
                          {article.comments_count}
                        </Text>
                        <TouchableOpacity
                          onPress={() => {
                            Share.open(shareOptions);
                          }}
                        >
                          <ShareIcon name={"share"} style={styles.shareIcon} />
                        </TouchableOpacity>
                      </View>
                    </View>

                    {/* COMMENT */}

                    <View style={styles.commentContainer}>
                      <Text style={styles.commentTxt}>Comments</Text>

                      <View style={styles.commentBoxWrapper}>
                        <TextInput
                          style={styles.commentTextInput}
                          placeholder={"Write a comment ... "}
                          placeholderTextColor={Constant.color.grey}
                          multiline
                          onChangeText={commentText =>
                            this.setState({ commentText })
                          }
                          value={this.state.commentText}
                        />
                      </View>
                      <TouchableOpacity
                        style={styles.postCommentWrapper}
                        onPress={() => {
                          this.props.createComment(
                            article.id,
                            accessTokenApi,
                            this.state.commentText
                          );
                          this.resetForm()
                        }}
                      >
                        <Text style={styles.postText}>Post</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            );
          })}
        {/* COMMENT FIELD */}
        {!isCreateComment && (
          <View style={styles.commentWrapper}>
            <FlatList
              data={this.state.commentData}
              renderItem={this.renderCommentItem}
              keyExtractor={item => item.id.toString()}
              extraData={this.state}
              style={{ marginBottom: 20 }}
              initialNumToRender={10}
            />
          </View>
        )}
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.get("auth"),
  article: state.get("article")
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      likeArticle,
      unlikeArticle,
      createComment,
      fetchReplyComment,
      createReplyComment,
      getCommentIds,
      likeComment,
      unlikeComment
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Article);
