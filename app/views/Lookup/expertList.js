import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  FlatList,
  ActivityIndicator
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import FastImage from "react-native-fast-image";

import { Container } from "../../components/Container";
import Header from "../../components/header";
import styles from "../../styles/Lookup/styles.lookup";
import { fetchProfileData } from "../../modules/profile.module";


class ExpertList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expertIndustryData: []
    };
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    const { expertIndustryData } = nextProps.lookup.toJS();

    if (expertIndustryData.length > 0) {
      this.setState({
        expertIndustryData
      });
    }
  }
  renderExpertItem = item => {
    const expertItem = item.item;
    const { accessTokenApi, isUserLogin } = this.props.auth.toJS();
    return (
      <TouchableOpacity
        style={styles.expertContainer}
        onPress={() => {
          this.props.fetchProfileData(
            expertItem.id,
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

            <Text style={styles.industryName}>{expertItem.industry.name}</Text>
          </View>
          <Text style={styles.expertTitle}>
            {expertItem.job_position} - {expertItem.work_place}
          </Text>
          <Text
            numberOfLines={2}
            ellipsizeMode={"tail"}
            style={styles.expertDescription}
          >
            {expertItem.about_me}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  renderExpert() {
    const { isFetchExpertIndustry } = this.props.lookup.toJS();
    if (isFetchExpertIndustry) {
      return (
        <ActivityIndicator size="small" style={[styles.activityIndicator]} />
      );
    } else {
      return (
        <FlatList
          data={this.state.expertIndustryData}
          extraData={this.state}
          keyExtractor={(item, index) => index.toString()}
          initialNumToRender={10}
          renderItem={this.renderExpertItem}
          ItemSeparatorComponent={() => {
            return <View style={styles.separator} />;
          }}
          style={{
              marginTop: 30
          }}
        />
      );
    }
  }
  render() {
    return (
      <Container>
        <Header headerText={"ExpertList"} navigation={this.props.navigation} isFromExpertList/>
        {this.renderExpert()}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  lookup: state.get("lookup"),
  auth: state.get("auth"),
  app: state.get("app")
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchProfileData,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExpertList);
