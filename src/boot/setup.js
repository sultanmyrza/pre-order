import React, { Component } from 'react';
import * as Expo from 'expo';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import logger from 'redux-logger'
import RootNavigationStack from '../navigation/RootNavigation';
import reducer from '../reducers';

const store = createStore(reducer, composeWithDevTools(applyMiddleware(logger)));

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
    return (
      <Provider store={store}>
        <RootNavigationStack />
      </Provider>
    );
  }
}
