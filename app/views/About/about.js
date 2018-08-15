import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import InfoIcon from "react-native-vector-icons/Ionicons";

import { Container } from "../../components/Container";
import Header from "../../components/header";
import Constant from "../../config/constant";

export default class About extends Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: "About",
    drawerIcon: (
      <InfoIcon
        name={"ios-information-circle-outline"}
        style={{
          fontSize: 22,
          color: Constant.color.white
        }}
      />
    )
  });

  render() {
    return (
      <Container>
        <Header headerText={"About"} navigation={this.props.navigation} />
        <View style={{ marginTop: 20, marginLeft: 20, marginRight: 10 }}>
          <Text style={styles.aboutText}>
            Career Ladder, a professional networking platform, allows experts to
            share their success stories and connects beginners with experts for
            valuable insights into their own occupational advancement.
          </Text>

          <Text style={styles.aboutText}>
            Via Career Ladder, <Text style={{ fontWeight: 'bold' }}>beginners</Text>  can get the big picture of their
            desired career path, including necessary skills, helpful job
            positions and wise advice for success.
          </Text>

          <Text style={styles.aboutText}>
           <Text style={{ fontWeight: 'bold' }}>Experts</Text>  can provide much needed inspiration, encouraging new talents
            and giving back to the community.
          </Text>

          <Text style={styles.aboutText}>
            In addition, <Text style={{ fontWeight: 'bold' }}>individuals</Text>  can promote themselves for employment, thus
            a quality recruitment source for interested companies. Aiming to
            create a global professional network in various fields, the app can
            add great <Text style={{fontWeight: 'bold'}}>values</Text>  to individuals’ careers and the economy as a whole.
          </Text>

          <Text
            style={{
              textAlign: "right",
              marginTop: 10,
              fontStyle: "italic"
            }}
          >
            Snow Deer Team 2018
          </Text>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  aboutText :{
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 10,
  }
});
