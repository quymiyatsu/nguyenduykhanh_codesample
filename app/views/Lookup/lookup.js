import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  AsyncStorage,
} from "react-native";
import Header from "../../components/header";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import SInfo from "react-native-sensitive-info";


import FastImage from "react-native-fast-image";
import SearchIcon from "react-native-vector-icons/Ionicons";
import PenIcon from "react-native-vector-icons/MaterialCommunityIcons";

import Constant from "../../config/constant";
import Tutorial from "../Tutorial/tutorial";

import {
  fetchJobIndustry,
  lookupModule,
  fetchExpertIndustry,
  startSearching
} from "../../modules/lookup.module";
import { fetchProfileData } from "../../modules/profile.module";
import { checkIfUserLogin, logout } from "../../modules/auth.module";
import { fetchSingleProfile } from '../../modules/profile.module';
import styles from "../../styles/Lookup/styles.lookup";


const API_TOKEN_STORAGE_KEY = "auth/ApiToken";

class LookUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActiveTab: true,
      jobIndustry: [],
      expertName: "",
      expertData: [],
      userProfile: [],
      currentPage: 1
    };
  }

  componentDidMount() {
    this.props.checkIfUserLogin();
    this.props.lookupModule("");
    const { accessTokenApi, isUserLogin } = this.props.auth.toJS();
    this.props.fetchProfileData("", accessTokenApi, isUserLogin);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const lookupData = nextProps.lookup.lookupData.toJS();
    const jobIndustryData = nextProps.lookup.industryData.toJS();
    const { profileData } = nextProps.profile.toJS();

    if (jobIndustryData.length > 0) {
      this.setState({
        jobIndustry: jobIndustryData
      });
    }
    if (lookupData.length > 3) {
      this.setState({
        expertData: [...this.state.expertData, ...lookupData]
      });
    } else if (lookupData.length < 3) {
      this.setState({
        expertData: lookupData
      })
    }

    if (profileData.length > 0) {
      this.setState({ userProfile: profileData });
    }
  }
  renderAreaItem = item => {
    const areaItem = item.item;
    return (
      <TouchableOpacity
        style={styles.areaWrapper}
        onPress={() => {
          this.props.fetchExpertIndustry(areaItem.id);
          this.props.navigation.navigate("ExpertList");
        }}
      >
        <Text style={styles.areaName}>{areaItem.name}</Text>
        <Text style={styles.expertCount}>
          ({areaItem.experts_count}) experts
        </Text>
      </TouchableOpacity>
    );
  };

  /**
  |--------------------------------------------------
  | RENDER EXPERT ITEM
  |--------------------------------------------------
  */

  renderExpertItem = item => {
    const expertItem = item.item;
    const { accessTokenApi, isUserLogin } = this.props.auth.toJS();
    if (expertItem !== undefined) {
      return (
        <TouchableOpacity
          style={styles.expertContainer}
          onPress={() => {
            this.props.fetchProfileData(
              expertItem.user_id,
              accessTokenApi,
              isUserLogin
            );
            this.props.navigation.navigate("Profile");

          }}
        >
          <View style={styles.avatarImgWrapper}>
            <FastImage
              source={{
                uri: expertItem.avatar.thumb
              }}
              style={styles.avatarImg}
            />
          </View>

          <View style={styles.expertDesWrapper}>
            <View style={styles.expertNameWrp}>
              <Text style={styles.expertName}>{expertItem.full_name}</Text>

              <Text style={styles.industryName}>
                {expertItem.industry.name}
              </Text>
            </View>
            <Text style={styles.expertTitle}>
              {expertItem.job_position} - {expertItem.work_place}
            </Text>
            <Text
              numberOfLines={2}
              ellipsizeMode={"tail"}
              style={styles.expertDescription}
            >
              {expertItem.about_me === 'null' ? '' : expertItem.about_me}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
  };

  onEndReach() {
    const { isStopLoadmore } = this.props.lookup.toJS();
    if (!isStopLoadmore && this.state.expertData.length > 10) {
      const page = this.state.currentPage + 1;
      this.props.lookupModule("A", page);

      this.setState({
        currentPage: page
      });
    } else  {
      return null
    }
  }

  renderTabContent() {
    const { isLookup, lookupData } = this.props.lookup.toJS();
    const { noData } = this.props.lookup.toJS();
    if (
      this.state.isActiveTab &&
      this.props.lookup.lookupData.toJS().length > 0 &&
      !noData
    ) {
      return (
        <FlatList
          data={this.state.expertData}
          extraData={this.state}
          keyExtractor={(item, index) => index.toString()}
          initialNumToRender={10}
          renderItem={this.renderExpertItem}
          style={{
            marginTop: 30,
            marginBottom: 10
          }}
          ItemSeparatorComponent={() => {
            return <View style={styles.separator} />;
          }}
          onEndReached={this.onEndReach.bind(this)}
          onEndReachedThreshold={0.1}
        />
      );
    } else {
      if (!isLookup && !noData) {
        return (
          <FlatList
            data={this.state.jobIndustry}
            keyExtractor={item => item.id.toString()}
            renderItem={this.renderAreaItem}
            style={{
              marginTop: 20
            }}
          />
        );
      } else {
        return <View />
      }
      
    }
  }

  renderLookupIndicator() {
    const { isLookup, isLookUpMore } = this.props.lookup.toJS();
    if (isLookup) {
      return (
        <ActivityIndicator size="small" style={styles.activityIndicator} />
      );
    } else if (isLookUpMore) {
      return (
        <ActivityIndicator
          size="small"
          style={{
            position: "absolute",
            bottom: 10,
            left: 0,
            right: 0,
            justifyContent: "center",
            alignItems: "center"
          }}
        />
      );
    }
  }

  /**
  |--------------------------------------------------
  | RENDER NO DATA
  |--------------------------------------------------
  */
  renderNodata() {
    const { noData } = this.props.lookup.toJS();
    if (noData) {
      return (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: Constant.layout.screenHeight / 3.5
          }}
        >
          <Text
            style={{
              color: Constant.color.greyDark,
              textAlign: "center",
              fontSize: 16
            }}
          >
            No data available
          </Text>
        </View>
      );
    } else {
      return (<View />)
    }
  }

  /**
  |--------------------------------------------------
  | renderPenIcon
  |--------------------------------------------------
  */
  renderPenIcon() {
   
  }

  render() {
    const { isActiveTab } = this.state;
    const { isFetchIndustry } = this.props.lookup.toJS();
    const app = this.props.app;
    if (app.isFirstTime) {
      return <Tutorial />;
    }
    return (
      <View style={styles.container}>
      
        <Header
          headerText={"Look up Professionals"}
          navigation={this.props.navigation}
        />

        <View style={styles.inputWrapper}>
          <SearchIcon name={"md-search"} style={styles.searchIcon} />
          <TextInput
            underlineColorAndroid={"transparent"}
            placeholder="Search expert or area name"
            placeholderTextColor={Constant.color.blueShade}
            onChangeText={expertName => {
              this.setState({ expertName })
              if (expertName.length === 0) {
                this.props.lookupModule('')
              }
            }}
            style={styles.input}
            onSubmitEditing={() => {
              this.setState({
                expertData: [],
                isActiveTab: true,
              })
              this.props.lookupModule(this.state.expertName);
              this.props.startSearching();
            }}
          />
        </View>

        <View style={styles.tabWrapper}>
          <TouchableOpacity
            style={[
              styles.tab,
              {
                backgroundColor: isActiveTab
                  ? Constant.color.theme
                  : Constant.color.white,
                borderRadius: isActiveTab ? null : 5
              }
            ]}
            onPress={() => {
              this.setState({ isActiveTab: !this.state.isActiveTab });
              this.props.lookupModule("A");
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: isActiveTab
                  ? Constant.color.white
                  : Constant.color.theme,
                fontSize: 17
              }}
            >
              Experts
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tab,
              {
                backgroundColor: !isActiveTab
                  ? Constant.color.theme
                  : Constant.color.white,
                borderRadius: !isActiveTab ? null : 5
              }
            ]}
            onPress={() => {
              this.setState({ isActiveTab: !this.state.isActiveTab });
              this.props.fetchJobIndustry();
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: !isActiveTab
                  ? Constant.color.white
                  : Constant.color.theme,
                fontSize: 17
              }}
            >
              Areas
            </Text>
          </TouchableOpacity>
        </View>

        {this.renderNodata()}

        {isFetchIndustry && (
          <ActivityIndicator size="small" style={styles.activityIndicator} />
        )}
        {this.renderLookupIndicator()}

        {/* Expert */}
        {this.renderTabContent()}
        {/* Areas */}

        {
           this.state.userProfile.map((profile, index) => {
            if (profile.is_expert === "expert") {
              return (
                <TouchableOpacity
                  style={styles.penIcWrapper}
                  onPress={() => this.props.navigation.navigate("ShareExperience")}
                  key={index}
                >
                  <PenIcon name={"pencil"} style={styles.penIc} />
                </TouchableOpacity>
              );
            } else {
              return null;
            }
          })
        }
      </View>
    );
  }
}

const mapStateToProps = state => ({
  lookup: state.get("lookup"),
  auth: state.get("auth"),
  app: state.get("app"),
  profile: state.get("profile"),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchJobIndustry,
      lookupModule,
      fetchProfileData,
      checkIfUserLogin,
      fetchExpertIndustry,
      startSearching,
      logout,
      fetchSingleProfile
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LookUp);
