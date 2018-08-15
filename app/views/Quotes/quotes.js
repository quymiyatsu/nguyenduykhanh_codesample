import React, { Component } from "react";
import { View, StyleSheet, Image, ActivityIndicator } from "react-native";

import { Card, Text, Button } from "react-native-elements";
import FastImage from "react-native-fast-image";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Header from "../../components/header";
import Constant from "../../config/constant";
import QuoteIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Deck from "./deck";
import { Container } from "../../components/Container";

import { fetchQuotes } from "../../modules/quotes.module";
class Quotes extends Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: "Inspiration",
    drawerIcon: (
      <QuoteIcon
        name={"format-quote-close"}
        style={{
          fontSize: 25,
          color: Constant.color.white
        }}
      />
    )
  });

  constructor(props) {
    super(props);
    this.state = {
      quotesData: null
    };
  }

  componentWillReceiveProps(nextProps) {
    const { quotesData } = nextProps.quotes.toJS();
    this.setState({
      quotesData
    });
  }

  componentDidMount() {
    this.props.fetchQuotes();
  }

  renderNoMoreCards() {
    return (
      <Card>
        <Text style={styles.warning}>Oop! There is no more content</Text>
        <Button
          title="Get more!"
          backgroundColor="#03A9F4"
          onPress={() => this.props.fetchQuotes()}
        />
      </Card>
    );
  }

  renderCard(item, index) {
    return (
      <View key={index} style={styles.quotesWrapper}>
        <Text style={styles.body}>"{item.body}"</Text>
        <Text style={styles.author}>- {item.author} - </Text>
      </View>
    );
  }
  render() {
    const { isFetchQuotes } = this.props.quotes.toJS();
    return (
      <Container style={{
        backgroundColor: 'rgb(246, 204, 115)'
      }}>
        <Header headerText={"Inspiration"} navigation={this.props.navigation} />

        <Text style={styles.title}>GET INSPIRED EVERYDAY BY FAMOUS QUOTES</Text>

        {isFetchQuotes ? (
          <ActivityIndicator size={"small"} style={styles.activitiIndicator} />
        ) : (
          <View>
            <Text style={styles.intruction}>* Swipe the card right or left to see the next quote</Text>
            <Deck
              data={this.state.quotesData}
              renderCard={this.renderCard}
              renderNoMoreCards={this.renderNoMoreCards.bind(this)}
            />
          </View>
        )}
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 30,
    textAlign: "center",
    letterSpacing: 1,
    marginLeft: 5,
    marginRight: 5,
    lineHeight: 30
  },
  quotesWrapper: {
    marginTop: 5,
    marginRight: 10,
    marginLeft: 10,
    borderStyle: "solid",
    borderRadius: 5,
    backgroundColor: Constant.color.white,
    flexWrap: "wrap",
    height: 160,
    shadowColor: "rgba(0, 0, 0, 0.2)",
    shadowOffset: {
      width: 1,
      height: 1.5
    },
    shadowOpacity: 0.2,
    elevation: 2,
  },
  body: {
    textAlign: "left",
    fontSize: 17,
    marginTop: 10,
    marginRight: 40,
    marginLeft: 30,
    color: Constant.color.greyDark,
    fontStyle: "italic",
  },
  author: {
    marginTop: 10,
    marginBottom: 10,
    textAlign: "right",
    marginRight: 10
  },
  warning: {
    textAlign: "center",
    marginBottom: 10,
    fontSize: 16
  },
  activitiIndicator: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center"
  },
  intruction: {
    fontSize: 10,
    marginLeft: 15,
    fontStyle: 'italic',
    marginTop: 40,
    color: Constant.color.greyDark
  }
});

const mapStateToProps = state => ({
  quotes: state.get("quotes")
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchQuotes
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Quotes);
