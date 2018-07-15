import { createStackNavigator, createSwitchNavigator } from 'react-navigation'; // Version can be specified in package.json

import {
  OrderDetail,
  OrderMenu,
  OrderPickUpTime,
  OrderResult,
  OrderReview,
  OrderSubmit,
  OrderTable,
  OrderTime,
  OrderType,
  ProductDetail,
} from '@screens';

const OrderStackNavigator = createStackNavigator(
  {
    OrderDetail: {
      screen: OrderDetail,
      navigationOptions: ({ navigation, defaultHeader }) => ({
        ...defaultHeader,
        title: 'Order detail',
      }),
    },
    OrderMenu: {
      screen: OrderMenu,
      navigationOptions: ({ navigation, defaultHeader }) => ({
        ...defaultHeader,
        title: 'Order Menu',
      }),
    },
    OrderPickUpTime: {
      screen: OrderPickUpTime,
      navigationOptions: ({ navigation, defaultHeader }) => ({
        ...defaultHeader,
        title: 'Pick-up time',
      }),
    },
    OrderSubmit: {
      screen: OrderSubmit,
    },
    OrderTable: {
      screen: OrderTable,
    },
    OrderTime: {
      screen: OrderTime,
      navigationOptions: ({ navigation, defaultHeader }) => ({
        ...defaultHeader,
        title: 'Select time',
      }),
    },
    OrderType: {
      screen: OrderType,
    },
    ProductDetail: {
      screen: ProductDetail,
    },
  },
  {
    initialRouteName: 'OrderType',
  }
);

const FinalStackNavigator = createStackNavigator({
  OrderResult: {
    screen: OrderResult,
  },
  OrderReview: {
    screen: OrderReview,
    navigationOptions: ({ navigation, defaultHeader }) => ({
      ...defaultHeader,
      title: 'Order Review',
    }),
  },
  ProductDetail: {
    screen: ProductDetail,
  },
});

const RootNavigationStack = createSwitchNavigator(
  {
    OrderBegin: OrderStackNavigator,
    OrderEnd: FinalStackNavigator,
  },
  { initialRouteName: 'OrderBegin' }
);

export default RootNavigationStack;
