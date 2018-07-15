import React, { Component } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import CustomButton from '../components/CustomButton';
import ScrollSelector from '../components/ScrollSelector';
import { getTimes } from '../utils';
import { setOrderTime } from '../actions/orderActions';

class OrderPickUpTime extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedValue: '12:00' };
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
            <ScrollSelector dataSource={getTimes()} onValueChange={this.onValueChange} center />
          </ScrollView>
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
              this.props.navigation.navigate('OrderEnd');
            }}
            title={'Submit'}
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
)(OrderPickUpTime);
