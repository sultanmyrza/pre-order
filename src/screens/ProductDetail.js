import React, { Component } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import images from '../../assets/images';

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
    const { product } = this.props.navigation.state.params;
    return (
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <View style={{ flex: 2 }}>
            <View style={{ flex: 4, padding: 30 }}>
              <Image
                style={{ flex: 1, width: null, height: null }}
                source={images[product.category]}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 24, fontWeight: 'bold', alignSelf: 'center' }}>
                {product.price} won
              </Text>
            </View>
          </View>

          <View style={{ flex: 1, padding: 30 }}>
            <Text style={{ fontSize: 18, alignSelf: 'center' }}>
              Food is any substance[1] consumed to provide nutritional support for an organism. It
              is usually of plant or animal origin, and contains essential nutrients, such as
              carbohydrates, fats, proteins, vitamins, or minerals. The substance is ingested by an
              organism and assimilated by the organism's cells to provide energy, maintain life, or
              stimulate growth.
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default ProductDetail;
