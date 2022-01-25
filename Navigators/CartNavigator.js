import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Cart from '../Screens/Cart/Cart';
import CheckoutNavigator from './CheckoutNavigator';
const Stack = createStackNavigator();

const CartStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='CartNavigator'
        component={Cart}
        options={{
          title: 'Cart',
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name='Checkout'
        component={CheckoutNavigator}
        options={{
          title: 'Checkout',
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default function CartNavigator() {
  return <CartStack />;
}
