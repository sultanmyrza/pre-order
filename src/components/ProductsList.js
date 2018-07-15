import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';

class ProductsList extends Component {
  constructor(props) {
    super(props);
    this.state = { editableMenu: false };
  }
  renderRow = product => {
    return (
      <View
        key={product.id + product.title}
        style={{ flex: 1, flexDirection: 'row', marginVertical: 10 }}>
        <TouchableOpacity onPress={() => this.props.onProductPress(product)} style={{ flex: 2 }}>
          <Text style={{ fontSize: 24 }}>{product.title}</Text>
          <Text style={{ fontSize: 18 }}>{product.price}won</Text>
        </TouchableOpacity>

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
          }}>
          {this.props.editableMenu && (
            <TouchableOpacity
              style={{ alignItems: 'center', flex: 1, borderRadius: 10 }}
              onPress={() => alert('decrease')}>
              <Text style={{ fontSize: 32 }}>-</Text>
            </TouchableOpacity>
          )}
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{ fontSize: 32 }}>0</Text>
          </View>
          {this.props.editableMenu && (
            <TouchableOpacity
              style={{ alignItems: 'center', flex: 1, borderRadius: 10 }}
              onPress={() => alert('increase')}>
              <Text style={{ fontSize: 32 }}>+</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };
  render() {
    return <ScrollView>{this.props.data.map(this.renderRow)}</ScrollView>;
  }
}

export default ProductsList;
