import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import ProductsList from '../components/ProductsList';
import { itemsFromDicToArray } from '../utils';

class OrderDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View style={{ flex: 1, paddingHorizontal: 10 }}>
        {/* Product List Start */}
        <View style={{ flex: 5 }}>
          <ProductsList
            data={itemsFromDicToArray(this.props.order.itemsByIds)}
            editableMenu
            onProductPress={product => this.props.navigation.navigate('ProductDetail', { product })}
          />
        </View>
        {/* Product List End */}

        {/* Footer-Start */}
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ flex: 1, justifyContent: 'space-around' }}>
            <Text style={{ fontSize: 22, fontWeight: 'bold', alignSelf: 'center' }}>
              {this.props.order.totalPrice} won
            </Text>
          </View>

          <View style={{ flex: 1, justifyContent: 'space-around' }}>
            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderRadius: 5,
                marginHorizontal: 10,
                height: 50,
                justifyContent: 'center',
              }}
              onPress={() => this.props.navigation.navigate('OrderSubmit')}>
              <Text style={{ fontSize: 18, alignSelf: 'center' }}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Footer-Start */}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    order: state.order,
  };
};

export default connect(mapStateToProps)(OrderDetail);
