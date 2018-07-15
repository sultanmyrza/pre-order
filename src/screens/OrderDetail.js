import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import colors from '../utils/colors';
import CategoryScroll from '../components/CategoryScroll';
import ProductsList from '../components/ProductsList';
import { getProducts } from '../utils';

class OrderDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View style={{ flex: 1, paddingHorizontal: 10, backgroundColor: colors[0] }}>
        {/* Product List Start */}
        <View style={{ flex: 5, backgroundColor: colors[2] }}>
          <ProductsList
            data={getProducts()}
            editableMenu
            onProductPress={product => this.props.navigation.navigate('ProductDetail', { product })}
          />
        </View>
        {/* Product List End */}

        {/* Footer-Start */}
        <View style={{ flex: 1, flexDirection: 'row', backgroundColor: colors[3] }}>
          <View style={{ flex: 1, backgroundColor: colors[4], justifyContent: 'space-around' }}>
            <Text style={{ fontSize: 22, fontWeight: 'bold', alignSelf: 'center' }}>
              1,144,000 won
            </Text>
          </View>

          <View style={{ flex: 1, backgroundColor: colors[5], justifyContent: 'space-around' }}>
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

export default OrderDetail;
