import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';
class CustomButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <TouchableOpacity
        style={{ borderRadius: 10, borderWidth: 1, width: 250, paddingVertical: 10 }}
        onPress={this.props.onPress}>
        <Text style={{ fontSize: 24, alignSelf: 'center' }}>{this.props.title}</Text>
      </TouchableOpacity>
    );
  }
}

export default CustomButton;
