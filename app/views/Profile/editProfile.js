import React, {Component} from 'react'
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Linking,
  ActivityIndicator,
} from 'react-native'
import FastImage from 'react-native-fast-image'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'


import ImagePicker from 'react-native-image-picker'

import {fetchProfileData, editProfile} from '../../modules/profile.module'
import ScreenHeader from '../../components/ScreenHeader'
import {Container} from '../../components/Container'

import Constant from '../../config/constant'
import I18n from '../../i18n/i18n'

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: '',
      avatarSource: require('../../assests/images/ronaldo660.jpg'),
      userName: '',
      email: '',
      facebook: '',
      twitter: '',
      linkdl: '',
      aboutMe: '',
      workPlace: '',
    }
  }

  componentDidMount() {
    const {accessTokenApi} = this.props.auth.toJS()
    this.props.fetchProfileData('', accessTokenApi, true)
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const data = nextProps.profile.toJS()
    if (data.profileData.length > 0) {
      const profile = data.profileData
      const avatarSource =
        profile[0].avatar.thumb
          ? {uri: profile[0].avatar.thumb}
          : {uri: 'http://lifecoach.com.vn/wp-content/uploads/2015/12/avatar.jpg'}


      const fullName = profile[0].full_name === 'null' ? '' : profile[0].full_name
      const facebookUrl = profile[0].facebook_url === 'null' ? '' : profile[0].facebook_url
      const twitterUrl = profile[0].twitter_url === 'undefined' ? '' : profile[0].twitter_url
      const linkdlUrl = profile[0].linkedin_url === 'undefined' ? '' : profile[0].linkedin_url
      const aboutMe = profile[0].about_me === 'null' ? '' : profile[0].about_me
      const workPlace = profile[0].work_place === 'null' ? '' : profile[0].work_place

      this.setState({
        userName: fullName || '',
        email: profile[0].email || '',
        aboutMe: aboutMe || '',
        workPlace: workPlace || '',
        facebook: facebookUrl  || '',
        twitter: twitterUrl || '',
        linkdl: linkdlUrl || '',
        id: profile[0].id,
        avatarSource: avatarSource
      })
    }
  }

  onPressEditAvatar() {
    const {accessTokenApi, isUserLogin} = this.props.auth.toJS()
    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    }

    ImagePicker.showImagePicker(options, response => {
      if (response.error === '') {

      } else if (response.didCancel) {
        // Click Cancel
      } else {
        const param = new FormData()
        param.append('avatar', {
          uri: response.uri.replace('file://', ''),
          name: response.fileName,
        })
        this.setState({
          avatarSource: response.uri
        })
        this.props.editProfile(param, accessTokenApi, this.state.id)
      }
    })
  }

  onPressSave() {
    const {accessTokenApi, isUserLogin} = this.props.auth.toJS()
    const param = new FormData()
    if (this.state.userName)
      param.append('full_name', this.state.userName)
    if (this.state.email)
      param.append('email', this.state.email)
    if (this.state.workPlace)
      param.append('work_place', this.state.workPlace)
    if (this.state.aboutMe)
      param.append('about_me', this.state.aboutMe)
    if (this.state.facebook)
      param.append('facebook_url', this.state.facebook)
    if (this.state.twitter)
      param.append('twitter_url', this.state.twitter)
    if (this.state.linkdl)
      param.append('linkedin_url', this.state.linkdl)

    this.props.editProfile(param, accessTokenApi, this.state.id)
  }

  renderContent() {
    return (
      <View>
        <View style={styles.subContainer}>


          <Text style={styles.textTitle}>{I18n.t('profile_profile')}</Text>

          <View style={styles.line}/>

          <View style={styles.rowContainer}>
            <View style={styles.wrapAvatar}>
              <FastImage
                style={styles.avatar}
                source={this.state.avatarSource}
              />
              <TouchableOpacity
                onPress={() => this.onPressEditAvatar()}
                style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                <MaterialIcons
                  name={'edit'}
                  color={Constant.color.darkBlue}
                  style={{marginTop: 10}}
                />
                <Text style={styles.textEdit}>
                  {I18n.t('profile_edit')}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.wrapInfo}>
              <TextInput
                value={this.state.userName}
                underlineColorAndroid="transparent"
                placeholder={I18n.t('user_name')}
                placeholderTextColor={Constant.color.textDisable}
                onChangeText={userName => this.setState({userName})}
                style={styles.textInput}
              />
              <View style={styles.line}/>
              <TextInput
                value={this.state.email}
                underlineColorAndroid="transparent"
                placeholder={I18n.t('email')}
                placeholderTextColor={Constant.color.textDisable}
                onChangeText={email => this.setState({email})}
                style={styles.textInput}
              />
              <View style={styles.line}/>
            </View>
          </View>
        </View>

        <View style={styles.line}/>

        <View style={[styles.subContainer]}>
          <Text style={styles.textTitle}>
            {I18n.t('profile_my_information')}
          </Text>

          <View style={styles.line}/>

          <View style={styles.item}>
            <Text style={[{width: '25%'}, styles.textBlue]}>{I18n.t('facebook')}</Text>
            <View style={styles.wrapDate}>
              <TextInput
                value={this.state.facebook}
                underlineColorAndroid="transparent"
                placeholder={I18n.t('facebook')}
                placeholderTextColor={Constant.color.textDisable}
                onChangeText={facebook => this.setState({facebook})}
                style={styles.textInput}
              />
              <View style={styles.line}/>
            </View>
          </View>

          <View style={styles.item}>
            <Text style={[{width: '25%'}, styles.textBlue]}>{I18n.t('twitter')}</Text>
            <View style={styles.wrapDate}>
              <TextInput
                value={this.state.twitter}
                underlineColorAndroid="transparent"
                placeholder={I18n.t('twitter')}
                placeholderTextColor={Constant.color.textDisable}
                onChangeText={twitter => this.setState({twitter})}
                style={styles.textInput}
              />
              <View style={styles.line}/>
            </View>
          </View>

          <View style={styles.item}>
            <Text style={[{width: '25%'}, styles.textBlue]}>{I18n.t('linkdl')}</Text>
            <View style={styles.wrapDate}>
              <TextInput
                value={this.state.linkdl}
                underlineColorAndroid="transparent"
                placeholder={I18n.t('linkdl')}
                placeholderTextColor={Constant.color.textDisable}
                onChangeText={linkdl => this.setState({linkdl})}
                style={styles.textInput}
              />
              <View style={styles.line}/>
            </View>
          </View>

          <View style={styles.item}>
            <Text style={[{width: '25%'}, styles.textBlue]}>{I18n.t('about_me')}</Text>
            <View style={styles.wrapDate}>
              <TextInput
                value={this.state.aboutMe}
                underlineColorAndroid="transparent"
                placeholder={I18n.t('about_me')}
                placeholderTextColor={Constant.color.textDisable}
                onChangeText={aboutMe => this.setState({aboutMe})}
                style={styles.textInput}
              />
              <View style={styles.line}/>
            </View>
          </View>

          <View style={styles.item}>
            <Text style={[{width: '25%'}, styles.textBlue]}>{I18n.t('work_place')}</Text>
            <View style={styles.wrapDate}>
              <TextInput
                value={this.state.workPlace}
                underlineColorAndroid="transparent"
                placeholder={I18n.t('work_place')}
                placeholderTextColor={Constant.color.textDisable}
                onChangeText={workPlace => this.setState({workPlace})}
                style={styles.textInput}
              />
              <View style={styles.line}/>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => this.onPressSave()}
            style={styles.button}>
            <Text style={{color: Constant.color.white}}>Save</Text>
          </TouchableOpacity>

        </View>
      </View>
    )
  }

  render() {
    const {isFetchProfile, profileData} = this.props.profile.toJS()

    return (
      <Container style={styles.container}>
        <ScreenHeader
          nav={this.props.navigation}
          headerTitle={'Profile'}
          isTextButton={true}
          hiddenBackButton={true}
          textButton={I18n.t('profile_save')}
          onPressActionButton={() => this.onPressSave()}
        />

        {isFetchProfile ? (
          <ActivityIndicator size={'small'} style={styles.indicator}/>
        ) : (
          <View style={styles.body}>{this.renderContent()}</View>
        )}
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: Constant.color.white,
    flex: 1,
  },
  subContainer: {
    backgroundColor: Constant.color.white,
    marginBottom: 1,
    marginTop: 1,
  },
  indicator: {
    flex: 1,
    position: 'absolute',
    alignSelf: 'center',
    top: 300,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  modalItemWrapper: {
    backgroundColor: Constant.color.white,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Constant.color.textGray,
    paddingVertical: 10,
    width: '100%',
  },
  modalItemContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  wrapAvatar: {
    flex: 1,
    alignItems: 'center',
  },
  item: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 20,
  },
  wrapInfo: {
    flex: 2,
    padding: 10,
  },
  wrapDate: {
    paddingLeft: 10,
    paddingVertical: 5,
    width: '75%'
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderColor: Constant.color.red,
    borderWidth: 1,
  },
  textEdit: {
    marginTop: 10,
    textAlign: 'center',
    color: Constant.color.darkBlue,
  },
  textBlue: {
    marginTop: 10,
    textAlign: 'left',
    color: Constant.color.darkBlue,
  },
  textInput: {
    paddingVertical: 10,
    color: Constant.color.shadow,
  },
  textTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    marginVertical: 10,
  },
  information: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },

  icon: {
    width: 20,
    alignSelf: 'center',
  },

  text: {
    alignSelf: 'center',
  },

  iconRight: {
    alignSelf: 'center',
    position: 'absolute',
    right: 20,
  },
  line: {
    backgroundColor: Constant.color.background,
    height: 1,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: Constant.color.facebook,
    width: 150,
    marginTop: 30,
    alignItems: 'center',
    borderRadius: 5,
    alignSelf: 'center',
    elevation: 1,
    shadowColor: Constant.color.black,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 5,
  }
})

const mapStateToProps = state => ({
  profile: state.get('profile'),
  auth: state.get('auth'),
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      editProfile,
      fetchProfileData,
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile)
