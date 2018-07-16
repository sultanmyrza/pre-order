import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import ProductsList from '../components/ProductsList';
import { formatTimeSecToMinWithSec, itemsFromDicToArray } from '../utils';

class OrderSubmit extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let nextScreen = 'OrderEnd';
    let nextButtonTitle = 'Submit';
    const { order } = this.props;
    const orderType = order.type;
    if (orderType === 'pickup') {
      nextScreen = 'OrderPickUpTime';
      nextButtonTitle = 'Next';
    }

    return (
      <View style={{ flex: 1, paddingHorizontal: 10 }}>
        {orderType === 'pickup' || (
          // {/* Product-Category-End
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 27 }}>
              Today at {order.time} {order.tables} tables ready in{' '}
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

const mapStateToProps = state => {
  return {
    order: state.order,
  };
};

export default connect(mapStateToProps)(OrderSubmit);
