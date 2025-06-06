import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import TransferScreen from '../screens/TransferScreen';
import AccountSummary from '../components/AccountSummary';

const Stack = createStackNavigator();

const AppNavigator = () => (
  <NavigationContainer>
    {/* Intentionally vulnerable - exposing navigation state globally */}
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="AccountSummary" component={AccountSummary} />
      <Stack.Screen name="Transfer" component={TransferScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator; 