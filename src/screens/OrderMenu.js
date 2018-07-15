import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import colors from '../utils/colors';
import CategoryScroll from '../components/CategoryScroll';
import ProductsList from '../components/ProductsList';
import { getProducts } from '../utils';

class OrderMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View style={{ flex: 1, paddingHorizontal: 10, backgroundColor: colors[0] }}>
        {/* Product-Category-End */}
        <View style={{ flex: 1, backgroundColor: colors[1] }}>
          <CategoryScroll />
        </View>
        {/* Product-Category-End */}

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
            <Text style={{ fontSize: 18, alignSelf: 'center' }}>3 items selected</Text>

            <TouchableOpacity onPress={() => this.props.navigation.navigate('OrderDetail')}>
              <Text style={{ fontSize: 18, alignSelf: 'center', textDecorationLine: 'underline' }}>
                View details
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ flex: 1, backgroundColor: colors[5], justifyContent: 'space-around' }}>
            <Text style={{ fontSize: 22, fontWeight: 'bold', alignSelf: 'center' }}>
              1,144,000 won
            </Text>

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('OrderSubmit')}
              style={{ borderWidth: 1, borderRadius: 5, marginHorizontal: 10 }}>
              <Text style={{ fontSize: 18, alignSelf: 'center' }}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Footer-Start */}
      </View>
    );
  }
}

export default OrderMenu;
