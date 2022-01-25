import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import LoginScreen from '../Screens/User/LoginScreen';
import RegisterScreen from '../Screens/User/RegisterScreen';
import UserProfile from '../Screens/User/UserProfile';

const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='LoginScreen'
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='RegisterScreen'
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='UserProfile'
        component={UserProfile}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default function UserNavigator() {
  return <MyStack />;
}
