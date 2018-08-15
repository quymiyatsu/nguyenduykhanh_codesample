import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  AsyncStorage,
  PanResponder,
  FlatList
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import EntypoIcon from "react-native-vector-icons/Entypo";
import SoyaIcon from "react-native-vector-icons/MaterialCommunityIcons";
import VoiceIcon from "react-native-vector-icons/MaterialIcons";
import PersonIcon from "react-native-vector-icons/Octicons";
import Constant from "../../config/constant";
import { skipTutorial } from "../../actions/app.action";

class Tutorial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrolling: false,
      screenIndex: 0
    };
    this.viewabilityConfig = {
      waitForInteraction: true,
      viewAreaCoveragePercentThreshold: 95
    };
    this.handleViewableItemsChanged = this.handleViewableItemsChanged.bind(
      this
    );
  }

  UNSAFE_componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderRelease: (evt, gestureState) => {
        if (Math.abs(gestureState.dx + gestureState.dy) < 5) {
          this.handleOnSingleOrDoubleClick();
        }
      }
    });
  }

  renderArticleContent = item => {
    switch (item.index) {
      case 0:
        return (
          <View style={styles.introWarpper}>
            <Text style={styles.h1Style}>{item.item}</Text>

            <SoyaIcon name={"soy-sauce"} style={styles.soya} />

            <Text style={styles.description}>
              We create a global professional network in which experts are able
              to share their success stories and connects beginners with experts
              for valuable insights into their own occupational advancement.
            </Text>
          </View>
        );
      case 1:
        return (
          <View style={styles.introWarpper}>
            <Text style={styles.h1Style}>{item.item}</Text>
            <VoiceIcon
              name={"record-voice-over"}
              style={styles.voiceIco}
            />
            <Text style={styles.description}>
              Experts can provide much needed inspiration, encouraging new
              talents and giving back to the community.
            </Text>
          </View>
        );
      case 2:
        return (
          <View style={styles.introWarpper}>
            <Text style={styles.h1Style}>{item.item}</Text>

            <PersonIcon
              name={'person'}
              style={styles.personIco}
            />

            <Text style={styles.description}>
              beginners can get the big picture of their desired career path,
              including necessary skills, helpful job positions and wise advice
              for success. They also shorten their dream career path, save money and time.
            </Text>
          </View>
        );
    }
  };

  onPressScrollToIndex(index) {
    this.setState({
      screenIndex: index
    });
    this.flatList.scrollToIndex({
      animated: true,
      index: index
    });
  }

  renderFooter(data) {
    const { screenIndex } = this.state;
    if (screenIndex + 1 > 2)
      return (
        <View style={{ position: "absolute", bottom: 20 }}>
          <View style={{ flexDirection: "row", alignSelf: "center" }}>
            {data.map((type, index) => {
              return (
                <EntypoIcon
                  name={"dot-single"}
                  size={50}
                  key={index}
                  color={
                    index === this.state.screenIndex
                      ? Constant.color.white
                      : Constant.color.gray
                  }
                />
              );
            })}
          </View>

          <View style={{ flexDirection: "row", alignSelf: "center" }}>
            <View style={styles.buttonSkip} />

            <TouchableOpacity
              onPress={() => this.props.skipTutorial()}
              style={[styles.buttonSkip, { alignSelf: "center" }]}
            >
              <Text style={styles.textSkip}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    return (
      <View style={{ position: "absolute", bottom: 20 }}>
        <View style={{ flexDirection: "row", alignSelf: "center" }}>
          {data.map((type, index) => {
            return (
              <EntypoIcon
                name={"dot-single"}
                size={50}
                key={index}
                color={
                  index === this.state.screenIndex
                    ? Constant.color.theme
                    : Constant.color.gray
                }
              />
            );
          })}
        </View>
        <View style={{ flexDirection: "row", alignSelf: "center" }}>
          <TouchableOpacity
            onPress={() => this.onPressScrollToIndex(2)}
            style={styles.buttonSkip}
          >
            <Text style={styles.textSkip}>Skip</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              this.onPressScrollToIndex(this.state.screenIndex + 1)
            }
            style={styles.buttonSkip}
          >
            <Text style={styles.textSkip}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  handleViewableItemsChanged(info) {
    if (info.changed.length === 0) return;
    this.setState({
      screenIndex: info.changed[0].index
    });
  }

  render() {
    const data = ["Make a solution", "Raising expert voice", "Help beginners"];
    return (
      <View style={{ flex: 1, alignItems: "center" }}>
        <FlatList
          {...this._panResponder.panHandlers}
          data={data}
          renderItem={this.renderArticleContent}
          ref={flatList => (this.flatList = flatList)}
          horizontal
          keyExtractor={index => index.toString()}
          extraData={this.state}
          showsHorizontalScrollIndicator={false}
          onScrollBeginDrag={() => this.setState({ scrolling: true })}
          onScrollEndDrag={() => this.setState({ scrolling: false })}
          pagingEnabled
          directionalLockEnabled
          viewabilityConfig={this.viewabilityConfig}
          onViewableItemsChanged={this.handleViewableItemsChanged}
        />
        {this.renderFooter(data)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {},
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold"
  },
  buttonSkip: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: "center",
    marginHorizontal: 120
  },
  textSkip: {
    color: Constant.color.theme,
    fontSize: 16,
    fontWeight: "bold"
  },
  buttonText: {
    color: Constant.color.white,
    fontSize: 50
  },
  h1Style: {
    textAlign: "center",
    fontSize: 27,
    fontWeight: "bold",
    color: Constant.color.theme,
    letterSpacing: 1
  },
  soya: {
    textAlign: "center",
    fontSize: 60,
    marginTop: 20,
    color: "rgb(190, 88, 113)"
  },
  description: {
    textAlign: "center",
    fontSize: 15,
    color: Constant.color.greyDark,
    marginTop: 20,
    lineHeight: 30
  },
  introWarpper: {
    padding: 50,
    backgroundColor: Constant.color.white,
    width: Constant.layout.screenWidth,
    height: Constant.layout.screenHeight
  },
  personIco: {
    fontSize: 60,
    color: 'rgb(234, 117, 86)', 
    marginTop: 20,
    textAlign: 'center'
  },
  voiceIco: {
    fontSize: 60,
    marginTop: 20,
    color: "rgb(68, 146, 98)",
    textAlign: "center"
  }
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      skipTutorial
    },
    dispatch
  );

export default connect(
  null,
  mapDispatchToProps
)(Tutorial);
