import React, { Component } from "react";
import { View, Text } from "react-native";
import EmailIcon from "react-native-vector-icons/Zocial";
import PhoneIcon from "react-native-vector-icons/FontAwesome";

import MailIcons from "react-native-vector-icons/MaterialIcons";
import { Container } from "../../components/Container";
import Header from "../../components/header";
import Constant from "../../config/constant";

export default class Contact extends Component {



  render() {
    return (
      <Container>
        <Header headerText={"Contact"} navigation={this.props.navigation} />
        <View style={{marginTop: 20, marginLeft: 20}}>
          <Text style={{fontSize: 16}}>Please contact us via:</Text>
          <View
            style={{
              flexDirection: "row",
              marginTop: 10
            }}
          >
            <EmailIcon name={"email"} 
              style={{
                color: Constant.color.greyDark,
                fontSize: 18,
                marginRight: 10
              }}
            />
            <Text style={{alignSelf: 'center'}}>snowdeers2018@gmail.com</Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              marginTop: 10
            }}
          >
            <PhoneIcon name={"mobile-phone"} 
              style={{
                color: Constant.color.greyDark,
                fontSize: 27,
                marginRight: 10
              }}
            />
            <Text style={{alignSelf: 'center'}}>(+84)1663 642 295</Text>
          </View>
        </View>
      </Container>
    );
  }
}
