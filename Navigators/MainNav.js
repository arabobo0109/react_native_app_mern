import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import React, { useContext } from 'react';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

import HomeNavigator from './HomeNavigator';
import CartNavigator from './CartNavigator';
import CartIcon from '../Shared/CartIcon';
import UserNavigator from './UserNavigator';
import AdminNavigator from './AdminNavigator';
import AuthGlobal from '../Context/store/AuthGlobal';

const Tab = createBottomTabNavigator();

const MainNav = () => {
  const context = useContext(AuthGlobal);
  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={{
        keyboardHidesTabBar: true,
        showLabel: false,
        activeTintColor: '#e91e63',
      }}
    >
      <Tab.Screen
        name='HomeScreen'
        component={HomeNavigator}
        options={{
          headerShown: false,
          tabBarIcon: () => {
            return <Entypo name='home' size={30} color='#f58849' />;
          },
        }}
      />
      <Tab.Screen
        name='Cart'
        component={CartNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => {
            return (
              <View>
                <Entypo name='shopping-cart' size={24} color='#f58849' />
                <CartIcon />
              </View>
            );
          },
        }}
      />

      <Tab.Screen
        name='User'
        component={UserNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => {
            return <Entypo name='user' size={24} color='#f58849' />;
          },
        }}
      />
      {context.stateUser.user.isAdmin == true ? (
        <Tab.Screen
          name='Admin'
          component={AdminNavigator}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => {
              return <FontAwesome5 name='user-cog' size={24} color='#f58849' />;
            },
          }}
        />
      ) : null}
    </Tab.Navigator>
  );
};

export default MainNav;
