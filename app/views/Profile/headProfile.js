import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import SInfo from "react-native-sensitive-info";
import RightArrow from "react-native-vector-icons/Ionicons";
import AccountIcon from "react-native-vector-icons/MaterialCommunityIcons";

import FastImage from "react-native-fast-image";

import Constant from "../../config/constant";

import { fetchSingleProfile } from "../../modules/profile.module";

const API_TOKEN_STORAGE_KEY = "auth/ApiToken";

class ProfileHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      singleProfileData: []
    };
  }

  componentDidMount() {
    SInfo.getItem(API_TOKEN_STORAGE_KEY, {}).then(data => {
      if (!data) return null;
      const tokenData = JSON.parse(data);
      this.props.fetchSingleProfile(tokenData);
    });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { singleProfileData } = nextProps.profile.toJS();
    if (singleProfileData.length > 0) {
      this.setState({
        singleProfileData
      });
    }
  }

  render() {  
    const { isUserLogin } = this.props.auth.toJS()
    
    if (isUserLogin) {
      return (
        this.state.singleProfileData.length > 0 &&
        this.state.singleProfileData.map((profile, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={styles.container}
              onPress={() => {
                this.props.navigation.navigate("Account");
              }}
            >
              <View style={styles.leftContainer}>
                <View style={styles.imgWrapper}>
                  <FastImage
                    source={{ uri: profile.avatar.thumb }}
                    style={styles.profileImg}
                  />
                </View>
  
                <Text style={styles.name}>{profile.full_name}</Text>
              </View>
  
              <RightArrow name="ios-arrow-forward" style={styles.arrowIcon} />
            </TouchableOpacity>
          );
        })
      );
    } else {
      return (
        <TouchableOpacity
          style={styles.container}
          onPress={() => this.props.navigation.navigate('Account')}
        >
        <View style={styles.leftContainer}>
          <AccountIcon
            name={'account-circle'}
            style={styles.accountIcon} 
          />
           <Text style={styles.accountTxt}>Account</Text>
        </View>
         
          <RightArrow name="ios-arrow-forward" style={styles.arrowIcon} />
        </TouchableOpacity>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: 10,
    marginTop: 20
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  imgWrapper: {
    width: "37%",
    height: "90%",
    borderRadius: 40,
    marginRight: 10
  },
  profileImg: {
    width: "100%",
    height: "100%",
    borderRadius: 50
  },
  name: {
    color: Constant.color.white,
    fontSize: 20
  },
  arrowIcon: {
    fontSize: 22,
    marginRight: 10,
    alignSelf: "center",
    paddingTop: 5,
    color: Constant.color.white
  },
  accountIcon: {
    color: Constant.color.white,
    fontSize: 30,
    marginLeft: 5
  },
  accountTxt: {
    color: Constant.color.white,
    fontSize: 16,
    marginLeft: 10
  }
});

const mapStateToProps = state => ({
  profile: state.get("profile"),
  auth: state.get("auth")
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchSingleProfile
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileHeader);
