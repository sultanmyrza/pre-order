import React, { Component } from 'react';
import * as Expo from 'expo';
import RootNavigationStack from '../navigation/RootNavigation';

export default class Setup extends Component {
  constructor() {
    super();
    this.state = {
      isReady: false,
    };
  }

  componentWillMount() {
    this.loadFonts();
  }

  async loadFonts() {
    await Expo.Font.loadAsync({});
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }
    return <RootNavigationStack />;
  }
}
