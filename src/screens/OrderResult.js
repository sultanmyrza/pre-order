import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { connect } from 'react-redux';
import TimerCountdown from '../components/TimerCountdown';
import { cancelOrder } from '../actions/orderActions';
import { generateOrderMetaInfo, formatTimeSecToMinWithSec } from '../utils';

class OrderResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderRequestReady: false,
      fadeAnim: new Animated.Value(0),
    };
  }
  componentDidMount() {
    if (this.state.orderRequestReady === false) {
      global.setTimeout(async () => {
        console.log('fetching order request');
        this.setState({ orderMetaInfo: generateOrderMetaInfo() });
        // firebaser request
        // await result
        // add listener to key
        this.setState({
          orderRequestReady: true,
        });

        Animated.timing(this.state.fadeAnim, {
          toValue: 1,
          duration: 3000,
        }).start();
      }, 3000);
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
    const info = this.state.orderMetaInfo;
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
        <Text style={{ fontSize: 18 }}>Order No. {info.orderNumber}</Text>
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
        <Text>Ordered from: {info.consumer}</Text>
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
    cancelOrder: () => dispatch(cancelOrder()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderResult);
