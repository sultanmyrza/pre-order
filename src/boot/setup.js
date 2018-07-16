import React, { Component } from 'react';
import { AppLoading, Asset, Font } from 'expo';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Image } from 'react-native';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import RootNavigationStack from '../navigation/RootNavigation';
import reducer from '../reducers';
import { firebaseAnonimSignIn } from '../api/firebase';
const store = createStore(reducer, composeWithDevTools(applyMiddleware(logger)));

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

function cacheFonts(fonts) {
  return fonts.map(font => Font.loadAsync(font));
}

export default class Setup extends Component {
  constructor() {
    super();
    this.state = {
      isReady: false,
    };
  }

  async _loadAssetsAsync() {
    const imageAssets = cacheImages([
      require('../../assets/images/products/hamburger.jpg'),
      require('../../assets/images/products/pizza.jpg'),
      require('../../assets/images/products/popcorn.jpg'),
      require('../../assets/images/products/ramen.jpg'),
      require('../../assets/images/products/steak.jpg'),
    ]);

    const fontAssets = cacheFonts([{}]);

    await Promise.all([firebaseAnonimSignIn(), ...imageAssets, ...fontAssets]);
  }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }
    return (
      <Provider store={store}>
        <RootNavigationStack />
      </Provider>
    );
  }
}
