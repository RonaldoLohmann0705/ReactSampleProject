import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from './src/screens/LoginScreen';
import Main from './screens/Main'

import CreateAccountScreen from './src/screens/CreateAccountScreen';

const AppNavigator = createStackNavigator(
  {
    Home: Main,
    Login: LoginScreen,
    CreateAccount: CreateAccountScreen,
  },
  {
    initialRouteName: 'Login',
  },
);

export default createAppContainer(AppNavigator);