import React, { Component } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import CustomButton from '../components/CustomButton';
import ScrollSelector from '../components/ScrollSelector';
import { getTables } from '../utils';

class OrderTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onValueChange = (selectedValue, selectedIndex) => {
    alert(`Selected tables ${selectedValue}`);
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
          <ScrollView style={{ flex: 2 }} justifyContent="center">
            <ScrollSelector dataSource={getTables()} onValueChange={this.onValueChange} />
          </ScrollView>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text style={{ alignSelf: 'center', fontSize: 24 }}>Tables</Text>
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
            onPress={() => this.props.navigation.navigate('OrderMenu')}
            title={'Next'}
          />
        </View>
      </View>
    );
  }
}

export default OrderTable;
