import React from 'react';
import { createStackNavigator, create} from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import AccountScreen from '../screens/AccountScreen';
import MarketScreen from '../screens/MarketScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ProfileScreen from '../screens/ProfileScreen';

import IconM from 'react-native-vector-icons/MaterialCommunityIcons';

const AccountStack = createStackNavigator({
  SignIn: SignInScreen,
  SignUp: SignUpScreen,
  Account: AccountScreen,
  Profile: ProfileScreen,
});

AccountStack.navigationOptions = {
  tabBarLabel: 'Account',
  tabBarIcon: ({ tintColor }) => {
    return <IconM name="account" size={30} color="cornflowerblue" />
  },
}

const MarketStack = createStackNavigator({
  Market: MarketScreen
});

MarketStack.navigationOptions = {
  tabBarLabel: 'Market',
  tabBarIcon: ({ tintColor }) => {
    return <IconM name="chart-line-variant" size={30} color="cornflowerblue" />
  },
}

const MainTabNavigator = createBottomTabNavigator(
  {
    MarketStack,
    AccountStack,
  },
  {
    tabBarOptions: {
      activeTintColor: '#e91e63',
      showIcon: true,
    },
  },
);

export default MainTabNavigator;
