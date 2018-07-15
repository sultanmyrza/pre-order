import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';

class ProductDetail extends Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    const { params } = navigation.state;

    return {
      title: params ? params.title : 'Product Detail',
    };
  };

  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 2 }}>
          <View style={{ flex: 4, padding: 30 }}>
            <Image
              style={{ flex: 1, width: null, height: null }}
              source={require('../../assets/images/products/burger.jpg')}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', alignSelf: 'center' }}>7,500 won</Text>
          </View>
        </View>

        <View style={{ flex: 1, padding: 30 }}>
          <Text style={{ fontSize: 18, alignSelf: 'center' }}>
            A hamburger, beefburger or burger is a sandwich consisting of one or more cooked patties
            of ground meat, usually beef, placed inside a sliced bread roll or bun. The patty may be
            pan fried, grilled, or flame broiled.
          </Text>
        </View>
      </View>
    );
  }
}

export default ProductDetail;
