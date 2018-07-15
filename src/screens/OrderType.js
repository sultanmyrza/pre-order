import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { setOrderType } from '../actions/orderActions';

class OrderType extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'gray' }}>
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <Text style={{ alignSelf: 'center', fontSize: 35 }}>Namsan Dinner</Text>
          <Text style={{ alignSelf: 'center', fontSize: 35 }}>& Pub</Text>
          <Text style={{ alignSelf: 'center', fontSize: 35 }}>Pre-order Service</Text>
        </View>

        <View style={{ flex: 2, flexDirection: 'row', padding: 10 }}>
          <View style={styles.typeContainer}>
            <TouchableOpacity
              style={styles.typeContainerItem}
              onPress={() => {
                this.props.setOrderType('pickup');
                this.props.navigation.navigate('OrderMenu');
              }}>
              <View style={{ flex: 1, paddingTop: 15 }}>
                <Text style={{ alignSelf: 'center', fontSize: 18 }}>Pick-up</Text>
                <Image
                  source={require('../../assets/images/order-pick-up.png')}
                  style={styles.itemImage}
                />
              </View>
            </TouchableOpacity>
            <View style={{ flex: 2, paddingTop: 10 }}>
              <Text style={{ alignSelf: 'center', fontSize: 14 }}>from 12:10pm</Text>
            </View>
          </View>

          <View style={styles.typeContainer}>
            <TouchableOpacity
              style={styles.typeContainerItem}
              onPress={() => {
                this.props.setOrderType('reservation');
                this.props.navigation.navigate('OrderTime');
              }}>
              <View style={{ flex: 1, paddingTop: 15 }}>
                <Text style={{ alignSelf: 'center', fontSize: 18 }}>Table-reservation</Text>
                <Image
                  source={require('../../assets/images/order-table.png')}
                  style={styles.itemImage}
                />
              </View>
            </TouchableOpacity>
            <View style={{ flex: 2, paddingTop: 10 }}>
              <Text style={{ alignSelf: 'center', fontSize: 14 }}>5 tables availabel now</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    setOrderType: orderType => dispatch(setOrderType(orderType)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderType);

const styles = StyleSheet.create({
  typeContainer: { flex: 2, padding: 10 },
  typeContainerItem: { flex: 2, backgroundColor: 'white', borderRadius: 8 },
  itemImage: { width: 120, height: 120, alignSelf: 'center' },
});
