import React, {Component} from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import MaterialIcons from 'react-native-vector-icons/Ionicons'
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import {Container} from '../../components/Container'
import Constant from "../../config/constant"
import ScreenHeader from '../../components/ScreenHeader'
import {createArticle} from "../../modules/article.module";
import Header from '../../components/header';

class Become extends Component {

  constructor(props) {
    super(props)
    this.state = {
      title: '',
      introduction: '',
      journey: '',
      challenges: '',
      conclusion: '',
      image: '',
      chooseImage: 'Choose aritcle image',
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.article.article !== null) {
      const {article} = nextProps.article
      if(article.status === 'ok') {
        console.log('Success')
      }
    }
  }

  onPressChooseImage() {
    const ImagePicker = require('react-native-image-picker');

// More info on all the options is below in the README...just some common use cases shown here
    const options = {
      title: 'Choose article image',
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        this.setState({
          image: {
            uri: response.uri.replace('file://', ''),
            name: response.fileName,
          },
          chooseImage: response.fileName,
        })
      }
    });
  }

  onPost() {
    const { accessTokenApi } = this.props.auth.toJS()

    const param = new FormData()
    param.append('title', this.state.title)
    param.append('introduction', this.state.introduction)
    param.append('journey', this.state.journey)
    param.append('challenges', this.state.challenges)
    param.append('conclusion', this.state.conclusion)
    param.append('image', this.state.image)

    this.props.createArticle(param, accessTokenApi)
  }

  render() {
    const { isLoading } = this.props.article.toJS()
    return (
      <Container style={styles.container}>
        <Header
          navigation={this.props.navigation}
          headerText={'How I become...'}
          isFromExpertList
        />

        <KeyboardAwareScrollView
          contentContainerStyle={{flex: 1}}
        >
        <ScrollView>
          {isLoading && <ActivityIndicator size={'small'} style={styles.indicator}/>}
          <View style={styles.body}>

            <Text style={styles.text}>1. Title</Text>
            <View style={styles.titleWrap}>
              <TextInput
                underlineColorAndroid='transparent'
                style={{textAlignVertical: "top"}}
                onChangeText={title => this.setState({title})}
                numberOfLines={1}/>
            </View>

            <Text style={styles.text}>2. Introduction</Text>
            <View style={styles.introductionWrap}>
              <TextInput
                placeholder= {"What did you decide to be a ... ?"}
                underlineColorAndroid='transparent'
                multiline
                style={{textAlignVertical: "top"}}
                onChangeText={introduction => this.setState({introduction})}
                numberOfLines={3}/>
            </View>
            <Text style={styles.text}>3. Your journey</Text>
            <View style={styles.journeyWrap}>
              <TextInput
                placeholder= {"What did you approach ...\n\nWhat did you do?\n\nWhat was your journey like?\n\n" +
                "What did you enjoy most from your journey?"}
                underlineColorAndroid='transparent'
                style={{textAlignVertical: "top"}}
                onChangeText={journey => this.setState({journey})}
                multiline numberOfLines={8}/>
            </View>
            <Text style={styles.text}>4. Challenges</Text>
            <View style={styles.challengeWrap}>
              <TextInput
                placeholder= {"What did challenge you becoming ... ?\n\nHow did you overcome?"}
                underlineColorAndroid='transparent'
                style={{textAlignVertical: "top"}}
                onChangeText={challenges => this.setState({challenges})}
                multiline numberOfLines={4}/>
            </View>
            <Text style={styles.text}>5. Conclusion</Text>
            <View style={styles.challengeWrap}>
              <TextInput
                placeholder= {"Tip and advice?\n\nFinal thoughts and next steps"}
                underlineColorAndroid='transparent'
                style={{textAlignVertical: "top"}}
                onChangeText={conclusion => this.setState({conclusion})}
                multiline numberOfLines={4}/>
            </View>

            <View style={styles.imageContainer}>
              <TouchableOpacity
                hadowOpacity={0.5}
                shadowRadius={10}
                onPress={() => this.onPressChooseImage()}
                style={styles.buttonImage}>
                <MaterialIcons
                  name={'ios-add-circle-outline'}
                  size={30}
                  color={Constant.color.theme}
                />
                <Text style={{
                  color: Constant.color.theme,
                  textAlign: 'center',
                  marginLeft: 10,
                }}>{this.state.chooseImage}</Text>
              </TouchableOpacity>
            </View>

          </View>

          <TouchableOpacity
            hadowOpacity={0.5}
            shadowRadius={10}
            onPress={() => this.onPost()}
            style={styles.button}>
            <Text style={styles.textButton}>Post</Text>
          </TouchableOpacity>
        </ScrollView>
        </KeyboardAwareScrollView>

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
    flex: 1,
    padding: 20,
  },
  indicator: {
    flex: 1,
    position: 'absolute',
    alignSelf: 'center',
    top: 300,
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 3,
    borderColor: Constant.color.grey,
    height: 80,
    marginTop: 20,
    justifyContent: 'center',
    marginRight: 40,
    marginLeft: 40,
    borderStyle: 'dashed'
  },
  buttonImage: {
    flexDirection: 'row',
    backgroundColor: Constant.color.white,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderColor: Constant.color.grey,
    width: 200,
    borderRadius: 5,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textWelcome: {
    fontSize: 40,
    color: Constant.color.white,
    textAlign: 'center',
    marginTop: 100,
  },
  titleWrap: {
    padding: 5,
    borderWidth: 1,
    borderColor: Constant.color.grey,
    height: 30,
    marginTop: 10,
    borderRadius: 3,
  },
  introductionWrap: {
    padding: 5,
    borderWidth: 1,
    borderColor: Constant.color.grey,
    height: 80,
    marginTop: 10,
    borderRadius: 3,
  },
  journeyWrap: {
    padding: 5,
    borderWidth: 1,
    borderColor: Constant.color.grey,
    height: 150,
    marginTop: 10,
    borderRadius: 3,
  },
  challengeWrap: {
    padding: 5,
    borderWidth: 1,
    borderColor: Constant.color.grey,
    height: 80,
    marginTop: 10,
    borderRadius: 3,
  },
  text: {
    fontSize: 20,
    color: Constant.color.theme,
    marginTop: 20,
  },
  textButton: {
    fontSize: 20,
    color: Constant.color.white,
    textAlign: 'center',
  },
  button: {
    backgroundColor: Constant.color.theme,
    paddingVertical: 10,
    paddingHorizontal: 50,
    width: 200,
    borderRadius: 5,
    elevation: 5,
    shadowColor: Constant.color.black,
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    alignSelf: 'center',
    marginBottom: 10,
  }
})

const mapStateToProps = state => ({
  article: state.get('article'),
  auth: state.get('auth'),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      createArticle
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Become);
