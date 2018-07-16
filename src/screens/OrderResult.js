import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { connect } from 'react-redux';
import TimerCountdown from '../components/TimerCountdown';
import { cancelOrder, finishOrder } from '../actions/orderActions';
import { generateOrderMetaInfo, formatTimeSecToMinWithSec } from '../utils';

class OrderResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderRequestReady: false,
      orderFailed: false,
      fadeAnim: new Animated.Value(0),
    };
  }
  componentDidMount() {
    if (this.state.orderRequestReady === false) {
      // finish order
      let orderMetaInfo = generateOrderMetaInfo();
      let { consumer, provider, orderNumber, timestamp, status } = orderMetaInfo;
      this.props.finishOrder(consumer, provider, orderNumber, timestamp, status);
      // console.log(JSON.stringify(this.props.order));
      // await firebaser request
      // add listener to key
      // this.setState({
      //   orderRequestReady: true,
      // });
      Animated.timing(this.state.fadeAnim, {
        toValue: 1,
        duration: 3000,
      }).start();
    }
  }
  componentWillUnmount() {
    // TODO: remove firebase listener
  }
  render() {
    if (!this.state.orderRequestReady) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 36, fontWeight: 'bold' }}>Ordering...</Text>
        </View>
      );
    }
    if (this.state.orderFailed) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Order failed try again</Text>
          <TouchableOpacity
            onPress={() => {
              this.props.cancelOrder();
              this.props.navigation.navigate('OrderBegin');
            }}
            style={{
              width: 250,
              borderRadius: 5,
              borderWidth: 2,
              padding: 5,
              alignItems: 'center',
            }}>
            <Text style={{ fontSize: 24 }}>Try again</Text>
          </TouchableOpacity>
        </View>
      );
    }
    let { orderNumber, consumer } = this.props.order;
    let { fadeAnim } = this.state;
    return (
      <Animated.View
        style={{
          flex: 1,
          justifyContent: 'space-around',
          alignItems: 'center',
          opacity: fadeAnim,
        }}>
        <Text style={{ fontSize: 32 }}>Namsan Dinner & Pub</Text>
        <Text style={{ fontSize: 18 }}>Order No. {orderNumber}</Text>
        <Text style={{ fontSize: 24 }}>{this.props.order.totalPrice} won</Text>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('OrderReview')}>
          <Text style={{ fontSize: 24, textDecorationLine: 'underline' }}>Details</Text>
        </TouchableOpacity>
        <TimerCountdown
          initialSecondsRemaining={this.props.order.totalCookTime * 1000}
          onTick={secondsRemaining =>
            console.log('tick', formatTimeSecToMinWithSec(Math.floor(secondsRemaining / 1000)))
          }
          onTimeElapsed={() => console.log('complete')}
          allowFontScaling
          style={{ fontSize: 20 }}
        />
        <Text>Ordered from: {consumer}</Text>
        <TouchableOpacity
          onPress={() => {
            this.props.cancelOrder();
            this.props.navigation.navigate('OrderBegin');
          }}
          style={{ width: 250, borderRadius: 5, borderWidth: 2, padding: 5, alignItems: 'center' }}>
          <Text style={{ fontSize: 24 }}>Cancel</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

const mapStateToProps = state => {
  return {
    order: state.order,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    finishOrder: (consumer, provider, orderNumber, timestamp, status) =>
      dispatch(finishOrder(consumer, provider, orderNumber, timestamp, status)),
    cancelOrder: () => dispatch(cancelOrder()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderResult);
