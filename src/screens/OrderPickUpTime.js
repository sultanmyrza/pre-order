import React, { Component } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import CustomButton from '../components/CustomButton';
import ScrollSelector from '../components/ScrollSelector';
import { getTimes } from '../utils';

class OrderPickUpTime extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onValueChange = (selectedValue, selectedIndex) => {
    alert(`Selected Time ${selectedValue}`);
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
            backgroundColor: 'pink',
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
            onPress={() => this.props.navigation.navigate('OrderEnd')}
            title={'Submit'}
          />
        </View>
      </View>
    );
  }
}

export default OrderPickUpTime;
