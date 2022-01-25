import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import ProductContainer from '../Screens/Products/ProductContainer';
import ProductDesc from '../Screens/Products/ProductDesc';

const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Product Container'
        component={ProductContainer}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='ProductDetail'
        component={ProductDesc}
        options={{
          title: 'Product Details',
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
export default function HomeNavigator() {
  return <MyStack />;
}
