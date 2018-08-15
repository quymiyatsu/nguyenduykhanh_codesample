import React, {Component} from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Picker,
  ScrollView,
  Platform,
  Modal,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import DateTimePicker from 'react-native-modal-datetime-picker'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import SInfo from "react-native-sensitive-info";

import { fetchSingleProfile } from '../../modules/profile.module'
import {createIntroduction} from "../../modules/introduction.module";
import {Container} from '../../components/Container'
import Constant from '../../config/constant'
import ScreenHeader from '../../components/ScreenHeader'
import Moment from 'moment'
import Occupitation from './occupitation'

const API_TOKEN_STORAGE_KEY = "auth/ApiToken";


class Introduction extends Component {
  constructor(props) {
    super(props)
    this.state = {
      language: 'Student',
      isExpert: true,
      isNewbie: false,
      fullName: '',
      companyName: '',
      email: '',
      phone: '',
      isDatePickerVisible: false,
      month: 'Month',
      day: 'Day',
      year: 'Year',
      birthday: '',
      isVisibleModal: false,
      occupitation: 'Student',
      companyTitle: 'School',
      jobTitleId: 1,
      jobId: 1,
      errorMess: '',
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.introduction.introduction !== null) {
      const {introduction} = nextProps.introduction
      if(introduction.status === 'ok') {
        SInfo.getItem(API_TOKEN_STORAGE_KEY, {}).then(data => {
          if (!data) return null;
          const tokenData = JSON.parse(data);
          this.props.fetchSingleProfile(tokenData);
        });
        this.props.navigation.navigate('Lookup')
      }

      if (introduction.message) {
        this.setState({
          errorMess: introduction.message
        })
      }
    } 
  }

  onPressExpert() {
    this.setState({
      isExpert: true,
      isNewbie: false,
    })
  }

  onPressNewbie() {
    this.setState({
      isExpert: false,
      isNewbie: true,
    })
  }

  getDateOfBirth = (date) => {
    this.setState({
      isDatePickerVisible: false,
      day: Moment(date).format('DD'),
      month: Moment(date).format('MM'),
      year: Moment(date).format('YYYY'),
      birthday: Moment(date).format('DD/MM/YYYY')
    })
  }

  onPressItem(item, jobId, jobTitleId) {
    this.setState({
      occupitation: item,
      isVisibleModal: false,
      jobTitleId: jobTitleId,
      jobId: jobId
    })
    if(item === 'Student') {
      this.setState({
        companyTitle: 'School'
      })
    } else {
      this.setState({
        companyTitle: 'Company Name'
      })
    }
  }

  onPressDone() {
    const { accessTokenApi } = this.props.auth.toJS()

    if(this.state.fullName === '' || this.state.email === '' || this.state.companyName === '' || this.state.birthday === '') {
      console.log('Error')
    } else {
      const param = new FormData()
      param.append('birthday', this.state.birthday)
      param.append('full_name', this.state.fullName)
      param.append('email', this.state.email)
      param.append('phone', this.state.phone)
      param.append('work_place', this.state.companyName)
      param.append('job_title_id', this.state.jobTitleId)
      param.append('industry_id', this.state.jobId)
      if(this.state.isExpert) {
        param.append('is_expert', 'waiting')
      }
      this.props.createIntroduction(param, accessTokenApi)
    }

  }

  renderModal = () => (
    <Occupitation
      onPressItem={this.onPressItem.bind(this)}
    />
  )


  renderErrMessage() {
    if (this.state.errorMess.length > 0) {
      if (this.state.errorMess === 'Email Invalid Email') {
        return (
          <View style={{ marginTop: 5}}>
            <Text style={{
              fontSize: 12,
              color: Constant.color.red
            }}>Email should follow the format youremail@example.com</Text>
          </View>
        )
      }
    }
  }

  render() {
    const { isCreateIntroduction } = this.props.introduction.toJS()
    return (
      <Container style={styles.container}>
        <ScreenHeader
          nav={this.props.navigation}
          headerTitle={'Introduction'}
        />

        {isCreateIntroduction && <ActivityIndicator size={'small'} style={styles.indicator}/>}

        <ScrollView>
          <Modal
            visible={this.state.isVisibleModal}
            animationType={'fade'}
            onRequestClose={() => this.setState({isVisibleModal: false})}
            transparent={true}
          >
            <View style={styles.modalWrapper}>
              {this.renderModal()}
            </View>
          </Modal>
          <KeyboardAvoidingView style={styles.body} behavior={'padding'}>
            <Text style={styles.textHeader}>Personal</Text>
            <View style={styles.line}/>
            <Text style={[styles.textTitle, {marginTop: 10}]}>Full name</Text>

            <View style={styles.input}>
              <TextInput
                underlineColorAndroid='transparent'
                autoCapitalize='none'
                onChangeText={fullName => this.setState({fullName})}
              />
            </View>


            <Text style={[styles.textTitle, {marginTop: 10}]}>Date of birth</Text>
            <View style={styles.dateOfBirth}>
              <TouchableOpacity
                onPress={() => this.setState({isDatePickerVisible: true})}
                style={[styles.picker, {width: 100}]}>
                <Text style={styles.textTitle}>{this.state.month}</Text>
                <MaterialCommunityIcons
                  style={styles.iconMenuDown}
                  name='menu-down'
                  size={20}
                  color={Constant.color.background}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.setState({isDatePickerVisible: true})}
                style={[styles.picker, {width: 85}]}>
                <Text style={styles.textTitle}>{this.state.day}</Text>
                <MaterialCommunityIcons
                  style={styles.iconMenuDown}
                  name='menu-down'
                  size={20}
                  color={Constant.color.background}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.setState({isDatePickerVisible: true})}
                style={[styles.picker, {width: 90}]}>
                <Text style={styles.textTitle}>{this.state.year}</Text>
                <MaterialCommunityIcons
                  style={styles.iconMenuDown}
                  name='menu-down'
                  size={20}
                  color={Constant.color.background}
                />
              </TouchableOpacity>
            </View>


            <DateTimePicker
              isVisible={this.state.isDatePickerVisible}
              onConfirm={this.getDateOfBirth.bind(this)}
              onCancel={() => this.setState({isDatePickerVisible: false})}
            />

            <Text style={[styles.textTitle, {marginTop: 10}]}>Occupitation</Text>
            <View style={[styles.picker, {width: 180}]}>
              <Text style={styles.textTitle}>{this.state.occupitation}</Text>

              <MaterialCommunityIcons
                style={styles.iconMenuDown}
                name='menu-down'
                onPress={() => this.setState({isVisibleModal: true})}
                size={20}
                color={Constant.color.background}
              />
            </View>

            <View>
              <View
                style={styles.checkBox}>
                <TouchableOpacity
                  style={[styles.dot, {backgroundColor: this.state.isExpert ? Constant.color.theme : Constant.color.white}]}
                  onPress={() => this.onPressExpert()}
                />
                <Text style={styles.textTitle}>I am expert</Text>
              </View>

              <View
                style={styles.checkBox}>
                <TouchableOpacity
                  style={[styles.dot, {backgroundColor: this.state.isNewbie ? Constant.color.theme : Constant.color.white}]}
                  onPress={() => this.onPressNewbie()}
                />
                <Text style={styles.textTitle}>I am newbie</Text>
              </View>
            </View>

            <Text style={[styles.textHeader, {marginTop: 10}]}>Contact</Text>
            <View style={styles.line}/>

            <Text style={[styles.textTitle, {marginTop: 10}]}>{this.state.companyTitle}</Text>
            <View style={styles.input}>
              <TextInput
                underlineColorAndroid='transparent'
                autoCapitalize='none'
                onChangeText={companyName => this.setState({companyName})}
              />
            </View>
            <Text style={[styles.textTitle, {marginTop: 10}]}>Email</Text>
            <View style={styles.input}>
              <TextInput
                underlineColorAndroid='transparent'
                autoCapitalize='none'
                style={{textAlignVertical: "top"}}
                onChangeText={email => this.setState({email})}
              />
            </View>

            {this.renderErrMessage()}

            <Text style={[styles.textTitle, {marginTop: 10}]}>Phone</Text>
            <View style={styles.input}>
              <TextInput
                underlineColorAndroid='transparent'
                autoCapitalize='none'
                style={{textAlignVertical: "top"}}
                onChangeText={phone => this.setState({phone})}
              />
            </View>
            <TouchableOpacity
            hadowOpacity={0.5}
            shadowRadius={10}
            onPress={() => this.onPressDone()}
            style={styles.button}>
            <Text style={styles.textButton}>I'm Done</Text>
          </TouchableOpacity>
          </KeyboardAvoidingView>
         
        </ScrollView>

      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constant.color.white,
    marginTop: Constant.layout.navPadding,
  },
  body: {
    paddingVertical: 20,
    paddingLeft: 20,
    paddingRight: 40,
  },
  indicator: {
    flex: 1,
    position: 'absolute',
    alignSelf: 'center',
    top: 300,
  },
  dateOfBirth: {
    flexDirection: 'row',
  },
  textHeader: {
    fontSize: 20,
    color: Constant.color.facebook,
  },
  textTitle: {
    fontSize: 15,
    color: Constant.color.background,
  },
  textTitleOptional: {
    fontSize: 15,
    color: Constant.color.gray,
  },
  input: {
    borderWidth: 0.5,
    ...Platform.select({
      android: {
        height: 40,
        paddingHorizontal: 5,
      },
      ios: {
        padding: 5,
      }
    }),
    borderColor: Constant.color.gray,
    marginTop: 5,
    borderRadius: 3,
  },
  picker: {
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: Constant.color.gray,
    padding: 5,
    marginVertical: 5,
    alignItems: 'center',
    borderRadius: 3,
    marginRight: 20,
  },
  iconMenuDown: {
    position: 'absolute',
    right: 0,
  },
  checkBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  line: {
    borderBottomColor: Constant.color.gray,
    borderBottomWidth: 0.5,
    alignSelf: 'center',
    marginTop: 5,
    width: '100%',
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderColor: Constant.color.background,
    borderWidth: 2,
    marginRight: 10,
  },
  textButton: {
    fontSize: 18,
    color: Constant.color.white,
    textAlign: 'center',
  },
  button: {
    backgroundColor: Constant.color.theme,
    paddingVertical: 10,
   
    width: 150,
    marginBottom: 10,
    borderRadius: 5,
    alignSelf: 'center',
    elevation: 2,
    shadowColor: Constant.color.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 1,
    marginTop: 20,
  },
  modalWrapper: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
})

const mapStateToProps = state => ({
  introduction: state.get('introduction'),
  auth: state.get('auth'),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      createIntroduction,
      fetchSingleProfile,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Introduction);
