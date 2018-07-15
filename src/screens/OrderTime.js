import React, { Component } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import CustomButton from '../components/CustomButton';
import ScrollSelector from '../components/ScrollSelector';
import { getTimes } from '../utils';
import { setOrderTime } from '../actions/orderActions';

class OrderTime extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedValue: '12:00' };
    this.time = undefined;
  }

  onValueChange = (selectedValue, selectedIndex) => {
    this.setState({ selectedValue });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 3,
            padding: 5,
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <ScrollView style={{ flex: 1 }} justifyContent="center">
            <ScrollSelector
              ref={time => this.time}
              dataSource={getTimes()}
              onValueChange={this.onValueChange}
            />
          </ScrollView>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text style={{ alignSelf: 'center', fontSize: 24 }}>Today</Text>
          </View>
        </View>
        <View style={{ flex: 1, padding: 5, justifyContent: 'center' }}>
          <Text style={{ fontSize: 25, alignSelf: 'center' }}>5 Tables available</Text>
        </View>
        <View
          style={{
            flex: 2,
            padding: 5,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <CustomButton
            onPress={() => {
              this.props.setOrderTime(this.state.selectedValue);
              this.props.navigation.navigate('OrderTable');
            }}
            title={'Next'}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    order: state.order,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setOrderTime: orderTime => dispatch(setOrderTime(orderTime)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderTime);
