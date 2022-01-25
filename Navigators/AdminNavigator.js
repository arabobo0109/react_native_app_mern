import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Categories from '../Screens/Admin/Categories';
import Orders from '../Screens/Admin/Orders';
import Products from '../Screens/Admin/Products';
import ProductsForm from '../Screens/Admin/ProductsForm';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Products'
        component={Products}
        options={{
          title: 'Products',
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
        name='Categories'
        component={Categories}
        options={{
          title: 'Categories',
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
        name='Orders'
        component={Orders}
        options={{
          title: 'Order',
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
        name='ProductsForm'
        component={ProductsForm}
        options={{
          title: 'ProductsForm',
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
}

export default function AdminNavigator() {
  return <MyStack />;
}
