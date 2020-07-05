/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import SplashScreen from './views/SplashScreen';
import LoginScreen from './views/LoginScreen';
import RegisterScreen from './views/RegisterScreen';
import DrawerNavigationRoutes from './views/DrawerNavigationRoutes';

const Auth = createStackNavigator({
  LoginScreen: {
    screen: LoginScreen,
    navigationOptions: {
      headerShown: false
    }
  },
  RegisterScreen: {
    screen: RegisterScreen,
    navigationOptions: {
      title: 'Registro',
      headerStyle: {
        backgroundColor: '1c313a'
      },
      headerTintColor: '#1c313a'
    }
  }
});

const App = createSwitchNavigator({
  SplashScreen: {
    screen: SplashScreen,
    navigationOptions: {
      headerShown: false
    }
  },
  Auth: {
    screen: Auth
  },
  DrawerNavigationRoutes: {
    screen: DrawerNavigationRoutes,
    navigationOptions: {
      headerShown: false
    }
  }
});

export default createAppContainer(App);
