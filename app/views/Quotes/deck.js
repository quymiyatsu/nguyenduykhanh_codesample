import React, { Component } from "react";
import {
  View,
  Animated,
  PanResponder,
  StyleSheet,
  LayoutAnimation,
  UIManager
} from "react-native";
import Constant from "../../config/constant";

const SWIPE_THRESHOLD = Constant.layout.screenWidth * 0.25;
const SWIPE_OUT_DURATION = 250;

export default class Deck extends Component {
  static defaultProps = {
    onSwipeRight: () => {},
    onSwipeLeft: () => {}
  };
  constructor(props) {
    super(props);

    const position = new Animated.ValueXY();

    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          this.forceSwipe("right");
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          this.forceSwipe("left");
        } else {
          this.resetPosition();
        }
      }
    });

    this.state = { panResponder, position, index: 0, isShowContent: false };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data.quotes !== this.props.data.quotes) {
      this.setState({ index: 0 });
    }
  }

  componentWillUpdate() {
    // UIManager.setLayoutAnimationEnabledExperimental &&
    //   UIManager.setLayoutAnimationEnabledExperimental(true);
    // LayoutAnimation.spring();
  }

  forceSwipe(direction) {
    const x =
      direction === "right"
        ? Constant.layout.screenWidth
        : -Constant.layout.screenWidth;
    Animated.timing(this.state.position, {
      toValue: { x, y: 0 },
      duration: SWIPE_OUT_DURATION
    }).start(() => this.onSwipeComplete(direction));
  }

  onSwipeComplete(direction) {
    const { onSwipeLeft, onSwipeRight, data } = this.props;
    const item = data[this.state.index];

    direction === "right" ? onSwipeRight(item) : onSwipeLeft(item);
    this.state.position.setValue({ x: 0, y: 0 });
    this.setState({ index: this.state.index + 1});
  }

  resetPosition() {
    Animated.spring(this.state.position, {
      toValue: { x: 0, y: 0 }
    }).start();
  }

  getCardStyle() {
    const { position } = this.state;
    const rotate = position.x.interpolate({
      inputRange: [
        -Constant.layout.screenWidth * 1.5,
        0,
        Constant.layout.screenWidth * 1.5
      ],
      outputRange: ["-120deg", "0deg", "120deg"]
    });
    return {
      ...position.getLayout(),
      transform: [{ rotate }]
    };
  }

  renderCards() {
    if (this.props.data !== null) {
      if (this.state.index >= this.props.data.quotes.length) {
        return this.props.renderNoMoreCards();
      }

      return this.props.data.quotes
        .map((item, index) => {
          if (index < this.state.index) {
            return null;
          }

          if (index === this.state.index) {
            return (
              <Animated.View
                style={this.getCardStyle()}
                {...this.state.panResponder.panHandlers}
                key={index}
              >
                {this.props.renderCard(item)}
              </Animated.View>
            );
          }
          return (
            <Animated.View key={index} style={[styles.cardStyle]}>
              {this.props.renderCard(item, index)}
            </Animated.View>
          );
        })
        .reverse();
    }
  }

  render() {
    return <View>{this.renderCards()}</View>;
  }
}

const styles = StyleSheet.create({
  cardStyle: {
    position: "absolute",
      width: Constant.layout.screenWidth
  }
});
