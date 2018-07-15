import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import colors from '../utils/colors';
import CategoryScroll from '../components/CategoryScroll';
import ProductsList from '../components/ProductsList';
import { getProducts } from '../utils';

class OrderSubmit extends Component {
  constructor(props) {
    super(props);
    this.state = { orderType: 'pickup' };
  }
  render() {
    let nextScreen = 'OrderFinish';
    let nextButtonTitle = 'Submit';
    if (this.state.orderType === 'pickup') {
      nextScreen = 'OrderPickUpTime';
      nextButtonTitle = 'Next';
    }

    return (
      <View style={{ flex: 1, paddingHorizontal: 10, backgroundColor: colors[0] }}>
        {this.state.orderType === 'pickup' || (
          // {/* Product-Category-End
          <View style={{ flex: 1, backgroundColor: colors[1] }}>
            <Text style={{ fontSize: 27 }}>Today at 12: 30 pm 3 tables ready in 22 min 33 sec</Text>
          </View>
        )
        // {/* Product-Category-End */}
        }
        {/* Product List Start */}
        <View style={{ flex: 5, backgroundColor: colors[2] }}>
          <ProductsList
            data={getProducts()}
            onProductPress={product => this.props.navigation.navigate('ProductDetail', { product })}
          />
        </View>
        {/* Product List End */}

        {/* Footer-Start */}
        <View
          style={{
            flex: 1,
            backgroundColor: colors[3],
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{ fontSize: 22, fontWeight: 'bold', alignSelf: 'center' }}>
            1,144,000 won
          </Text>
        </View>
        {/* Footer-Start */}
      </View>
    );
  }
}

export default OrderSubmit;
