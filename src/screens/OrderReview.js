import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import ProductsList from '../components/ProductsList';
import { itemsFromDicToArray, formatTimeSecToMinWithSec } from '../utils';

class OrderSubmit extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let nextScreen = 'OrderFinish';
    let nextButtonTitle = 'Submit';
    const orderType = this.props.order.type;
    if (orderType === 'pickup') {
      nextScreen = 'OrderPickUpTime';
      nextButtonTitle = 'Next';
    }
    const { order } = this.props;
    return (
      <View style={{ flex: 1, paddingHorizontal: 10 }}>
        {orderType === 'pickup' || (
          // {/* Product-Category-End
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 27 }}>
              Today at {order.time} {order.tables} tables ready in
              {formatTimeSecToMinWithSec(order.totalCookTime)}
            </Text>
          </View>
        )
        // {/* Product-Category-End */}
        }
        {/* Product List Start */}
        <View style={{ flex: 5 }}>
          <ProductsList
            data={itemsFromDicToArray(this.props.order.itemsByIds)}
            onProductPress={product => this.props.navigation.navigate('ProductDetail', { product })}
          />
        </View>
        {/* Product List End */}

        {/* Footer-Start */}
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{ fontSize: 22, fontWeight: 'bold', alignSelf: 'center' }}>
            {this.props.order.totalPrice} won
          </Text>
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

export default connect(mapStateToProps)(OrderSubmit);
