import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Alert
} from "react-native";
import FastImage from "react-native-fast-image";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";

import HeartOff from "react-native-vector-icons/Ionicons";
import CommentIcon from "react-native-vector-icons/Octicons";
import LeftArrow from "react-native-vector-icons/Feather";

import { Container } from "../../components/Container";
import Constant from "../../config/constant";
import profileModule, { fetchProfileData, followUser, unFollowUser } from "../../modules/profile.module";
import { fetchArticle, fetchSingleArticle, fetchComment } from "../../modules/article.module";
import styles from "../../styles/Profile/styles.profile";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActiveTab: true,
      profileData: PropTypes.array,
      userArticleData: PropTypes.array,
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const profileData = nextProps.profile.profileData.toJS();
    const userArticleData = nextProps.article.userArticleData.toJS();

    if (profileData.length > 0) {
      this.setState({
        profileData
      });
    }

    if (userArticleData.length > 0) {
      this.setState({
        userArticleData
      });
    }
  }

  /**
  |--------------------------------------------------
  | RENDER USER ARTICLE ITEM
  |--------------------------------------------------
  */

  renderUserArticleItem = item => {
    const articleItem = item.item;
    const { accessTokenApi, isUserLogin } = this.props.auth.toJS()
    return (
      <View style={styles.contentContainer}>
        <View style={styles.contentWrapper}>
          <Text style={styles.aboutMeTxt}>Posts by {articleItem.user.introduction.full_name}</Text>
          <View style={styles.postContentWrapper}>
            <View style={styles.postThumbnailWrapper}>
              <FastImage
                source={{
                  uri: articleItem.image.thumb
                }}
                style={styles.postThumbnail}
              />
            </View>

            <TouchableOpacity
              style={styles.postShortDesWrapper}
              onPress={() => {
                this.setState({
                  isActiveTab: true
                })
                this.props.fetchSingleArticle(articleItem.id, accessTokenApi, isUserLogin)
                this.props.fetchComment(articleItem.id)
                this.props.navigation.navigate('Article')
              }}
            >
              <Text style={styles.postTitle}>
                {articleItem.title}
              </Text>
              <Text
              numberOfLines={5}
              ellipsizeMode={'tail'}
              style={styles.postShortDes}>
                {articleItem.introduction}
              </Text>

              <View style={styles.postReactionWrapper}>
                <View style={styles.postLikeWrapper}>
                  <Text style={styles.likeCount}>{articleItem.cached_votes_up}</Text>
                  <HeartOff
                    name={"md-heart-outline"}
                    style={styles.heartOff}
                  />
                </View>

                <View style={styles.postCommentWrapper}>
                  <Text style={styles.commentCount}>{articleItem.comments_count}</Text>
                  <CommentIcon name={"comment"} style={styles.commentIcon} />
                </View>
              </View>
            </TouchableOpacity>

          </View>
        </View>
      </View>
    );
  };

  /**
  |--------------------------------------------------
  | Render Profile and Post
  |--------------------------------------------------
  */
  renderProfilePosts(profile) {
    const { userArticleData, isFetchArticle } = this.props.article.toJS();
    if (this.state.isActiveTab) {
      return (
        <View style={[styles.contentContainer, {
          height: Constant.layout.screenHeight
        }]}>
          <View style={styles.contentWrapper}>
            <Text style={styles.aboutMeTxt}>About me</Text>
            <Text style={styles.aboutMedes}>{profile.about_me}</Text>
          </View>
        </View>
      );
    } else {
      if (isFetchArticle) {
        return (
          <ActivityIndicator
            size='small'
            style={styles.profileActivityIndicator}
          />
        )
      }

      if (userArticleData.length > 0) {
        return ( 
            <FlatList
              data={this.state.userArticleData}
              renderItem={this.renderUserArticleItem}
              extraData={this.state}
              keyExtractor={(item, index) => index.toString()}
            />
        );
      }
    }
  }

  /**
  |--------------------------------------------------
  | RENDER HEADER
  |--------------------------------------------------
  */
  renderProfileHeader(profile) {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.headerTopWrapper}>
          <LeftArrow
            name="arrow-left"
            style={styles.menuIcon}
            onPress={() => this.props.navigation.goBack()}
          />

          <Text style={styles.profileText}>PROFILE</Text>

          <View />
        </View>

        <View style={styles.headerImgWrapper}>
          <FastImage
            source={{
              uri: profile.cover.medium
            }}
            resizeMode={"cover"}
            style={styles.headerImg}
          />
        </View>

        <View style={styles.headerFooterWrapper}>
          <View style={styles.followerWrapper}>
            <Text style={styles.followerCount}>
              {profile.user.followers_count}
            </Text>
            <Text style={styles.followerTxt}>Followers</Text>
          </View>
          <FastImage
            source={{
              uri: profile.avatar.thumb
            }}
            style={styles.userAvatar}
          />
          <View style={styles.followerPostWrapper}>
            <Text style={styles.postCount}>{profile.user.articles_count}</Text>
            <Text style={styles.postText}>Posts</Text>
          </View>
        </View>
      </View>
    );
  }

  /**
  |--------------------------------------------------
  | RENDER BODY
  |--------------------------------------------------
  */
  renderProfileBody(profile) {
    return (
      <View style={styles.profilePostWrapper}>
        <TouchableOpacity
          style={[
            styles.profileWrapper,
            {
              borderBottomColor: this.state.isActiveTab
                ? Constant.color.theme
                : Constant.color.white
            }
          ]}
          onPress={() => {
            this.setState({
              isActiveTab: !this.state.isActiveTab
            });
          }}
        >
          <Text
            style={[
              styles.prifileTabText,
              {
                color: this.state.isActiveTab
                  ? Constant.color.greyDark
                  : Constant.color.grey
              }
            ]}
          >
            Profile
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.postWrapper,
            {
              borderBottomColor: !this.state.isActiveTab
                ? Constant.color.theme
                : Constant.color.white
            }
          ]}
          onPress={() => {
            this.props.fetchArticle(profile.user_id);
            this.setState({
              isActiveTab: !this.state.isActiveTab
            });
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 18,
              color: !this.state.isActiveTab
                ? Constant.color.greyDark
                : Constant.color.grey
            }}
          >
            Posts
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  /**
  |--------------------------------------------------
  | Allow Render
  |--------------------------------------------------
  */
  allowFollow(profile) {
    const { accessTokenApi, isUserLogin } = this.props.auth.toJS()

    if (isUserLogin) {
      if (!profile.is_following) {
        this.props.followUser(profile.id, accessTokenApi)
      } else {
        this.props.unFollowUser(profile.id, accessTokenApi)
      }
    } else {
      Alert.alert(
        'Login',
        'You should login to follow this user',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Ok',
            onPress: () => this.props.navigation.navigate('Logins', { isNeedLogin: true }),
          },
        ],
        { cancelable: false }
      )
    }
  }

  /**
  |--------------------------------------------------
  | MAIN RENDER
  |--------------------------------------------------
  */

  render() {
    const { isFetchProfile, profileData, is_following } = this.props.profile.toJS();
    const { accessTokenApi, isUserLogin } = this.props.auth.toJS()

    return (
      <Container>
        {/* Profile Header */}
        {isFetchProfile && (
          <ActivityIndicator size={"small"} style={styles.activityIndicator} />
        )}
        {profileData.length > 0 &&
          profileData.map((profile, key) => {
            return (
              <View key={key} style={{ flex: 1 }}>
                {this.renderProfileHeader(profile)}

                {/* Profile Content */}
                <View style={styles.profileContentContainer}>
                  <Text style={styles.userName}>{profile.full_name}</Text>
                  <Text style={styles.userDescription}>
                    {profile.job_position} - {profile.work_place}
                  </Text>

                  {/* Follow and Message */}

                  <View style={styles.followMessageWrapper}>
                    <TouchableOpacity
                      style={[
                        styles.followWrapper,
                        {
                          backgroundColor: (profile.is_following && isUserLogin) ? Constant.color.theme : Constant.color.white
                        }
                      ]}
                      onPress={() => {
                        this.allowFollow(profile)
                      }}
                    >
                      <Text style={[
                        styles.followUserTxt,
                        {color: (profile.is_following && isUserLogin) ? Constant.color.white : "#4A90E2",}
                        ]}>Follow</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.messageWrapper}>
                      <Text style={styles.messageTxt}>Message</Text>
                    </TouchableOpacity>
                  </View>

                  {/* PROFILE AND POST */}
                  {this.renderProfileBody(profile)}

                  {/* Profile and Post Content */}
                  {this.renderProfilePosts(profile)}
                </View>
              </View>
            );
          })}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.get('profile'),
  article: state.get('article'),
  auth: state.get('auth'),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchProfileData,
      fetchArticle,
      fetchSingleArticle,
      followUser,
      unFollowUser,
      fetchComment
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
