import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
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
      <View style={{ flex: 1, paddingHorizontal: 10 }}>
        {this.state.orderType === 'pickup' || (
          // {/* Product-Category-End
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 27 }}>Today at 12: 30 pm 3 tables ready in 22 min 33 sec</Text>
          </View>
        )
        // {/* Product-Category-End */}
        }
        {/* Product List Start */}
        <View style={{ flex: 5 }}>
          <ProductsList
            data={getProducts()}
            onProductPress={product => this.props.navigation.navigate('ProductDetail', { product })}
          />
        </View>
        {/* Product List End */}

        {/* Footer-Start */}
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ flex: 1, justifyContent: 'space-around' }}>
            <Text style={{ fontSize: 22, fontWeight: 'bold', alignSelf: 'center' }}>
              1,144,000 won
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
              onPress={() => this.props.navigation.navigate(nextScreen)}>
              <Text style={{ fontSize: 18, alignSelf: 'center' }}>{nextButtonTitle}</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Footer-Start */}
      </View>
    );
  }
}

export default OrderSubmit;
