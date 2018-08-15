import React, {Component} from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from 'react-native'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import Constant from "../../config/constant";
import {fetchJob} from "../../modules/introduction.module";
import index from "../../reducers";

class Occupitation extends Component {

  componentWillMount() {
    this.props.fetchJob()
  }

  renderList = ({item, separators}, jobTitleId) => {
    return (
      <TouchableOpacity
        onPress={() => this.props.onPressItem(item.name, jobTitleId, item.id)}
        style={styles.item}>
        <Text>{item.name}</Text>
      </TouchableOpacity>
    )
  }

  render() {
    const { isFetchJob, jobData } = this.props.introduction.toJS();
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.textHeader}>Select Occupitation</Text>
        </View>
        <ScrollView>
          { isFetchJob ? (
            <ActivityIndicator />
          ) : (
            <View style={{paddingVertical: 10}}>
              {jobData.map(item => {
                return (
                  <View key={item.id}>
                    <Text style={styles.text}>
                      {item.name}
                    </Text>
                    <View style={[styles.lineSlim]}/>
                    <FlatList
                      data={item.job_titles}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={(data) => this.renderList(data, item.id)}
                      key={item.name}

                    />

                  </View>
                )
              })}
            </View>
          )}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Constant.color.white,
    alignSelf: 'center',
    width: '50%',
    height: '50%',
    position: 'absolute',
    top: 100,
  },
  header: {
    height: 50,
    backgroundColor: Constant.color.theme,
    alignItems: 'center',
    justifyContent: 'center'
  },
  item: {
    marginLeft: 20,
  },
  textHeader: {
    fontSize: 20,
    color: Constant.color.white,
    textAlign: 'center',
  },
  text: {
    fontSize: 20,
    marginHorizontal: 10,
    color: Constant.color.theme,
  },
  textButton: {
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
  },
  button: {
    backgroundColor: Constant.color.white,
    paddingVertical: 10,
    paddingHorizontal: 50,
    width: 160,
    marginTop: 50,
    borderRadius: 5,
    elevation: 2,
    shadowColor: Constant.color.black,
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  lineSlim: {
    borderBottomColor: Constant.color.theme,
    borderBottomWidth: 1,
    alignSelf: 'center',
    marginTop: 5,
    width: '100%',
  },
})

const mapStateToProps = state => ({
  introduction: state.get('introduction')
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchJob
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Occupitation);
