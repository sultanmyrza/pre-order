import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { orderAddItem, orderRemoveItem } from '../actions/orderActions';
class ProductsList extends Component {
  constructor(props) {
    super(props);
    this.state = { editableMenu: false };
  }
  renderRow = product => {
    const { order } = this.props;
    const item = order.itemsByIds[product.id];
    const orderQuantity = item ? item.quantity : 0;
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
              onPress={() => this.props.removeItem(product)}>
              <Text style={{ fontSize: 32 }}>-</Text>
            </TouchableOpacity>
          )}
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{ fontSize: 32 }}>{orderQuantity}</Text>
          </View>
          {this.props.editableMenu && (
            <TouchableOpacity
              style={{ alignItems: 'center', flex: 1, borderRadius: 10 }}
              onPress={() => this.props.addItem(product)}>
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

const mapStateToProps = state => {
  return {
    order: state.order,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addItem: product => dispatch(orderAddItem(product)),
    removeItem: product => dispatch(orderRemoveItem(product)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductsList);
