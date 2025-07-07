import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import TransferScreen from '../screens/TransferScreen';
import AccountSummary from '../components/AccountSummary';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Home" 
          component={AccountSummary} 
          options={{ title: 'Account Summary' }}
        />
        <Stack.Screen 
          name="Transfer" 
          component={TransferScreen} 
          options={{ title: 'Transfer Money' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator; 