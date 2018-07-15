import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import TimerCountdown from '../components/TimerCountdown';
import { cancelOrder } from '../actions/orderActions';

class OrderResult extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        <Text style={{ fontSize: 32 }}>Namsan Dinner & Pub</Text>
        <Text style={{ fontSize: 18 }}>Order No. 961505</Text>
        <Text style={{ fontSize: 24 }}>14,999 won</Text>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('OrderReview')}>
          <Text style={{ fontSize: 24, textDecorationLine: 'underline' }}>Details</Text>
        </TouchableOpacity>
        <TimerCountdown
          initialSecondsRemaining={1000 * 60 * 24}
          onTick={secondsRemaining => console.log('tick', secondsRemaining)}
          onTimeElapsed={() => console.log('complete')}
          allowFontScaling
          style={{ fontSize: 20 }}
        />
        <TouchableOpacity
          onPress={() => {
            this.props.cancelOrder();
            this.props.navigation.navigate('OrderBegin');
          }}
          style={{ width: 250, borderRadius: 5, borderWidth: 2, padding: 5, alignItems: 'center' }}>
          <Text style={{ fontSize: 24 }}>Cancel</Text>
        </TouchableOpacity>
      </View>
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
