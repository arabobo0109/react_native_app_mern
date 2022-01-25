import axios from 'axios';
import React, { useCallback, useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  ButtonStyle,
  StyleSheet,
  Image,
} from 'react-native';
import baseURL from '../../Configuration/baseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logoutUser } from '../../Context/Actions/Auth.Action';
import AuthGlobal from '../../Context/store/AuthGlobal';
import { FontAwesome } from '@expo/vector-icons';
import { Zocial } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

const UserProfile = (props) => {
  const context = useContext(AuthGlobal);
  const [userProfile, setUserProfile] = useState();

  useEffect(() => {
    const userData = context.stateUser.user.userId;
    const userId = userData?.replace('user', '');

    if (
      context.stateUser.isAuthenticated === false ||
      context.stateUser.isAuthenticated === null
    ) {
      props.navigation.navigate('LoginScreen');
    }
    AsyncStorage.getItem('jwt')
      .then((res) => {
        axios
          .get(`${baseURL}users/${userId}`, {
            headers: { Authorization: `Bearer ${res}` },
          })
          .then((user) => {
            console.log(user.data.data.user);
            setUserProfile(user.data.data.user);
          });
      })
      .catch((error) => console.log(error));
    return () => {
      setUserProfile();
    };
  }, [context.stateUser.isAuthenticated]);
  return (
    <View
      style={{
        flex: 1,

        backgroundColor: 'white',
      }}
    >
      <ScrollView>
        <View style={{ flexDirection: 'row', marginTop: 100, marginLeft: 40 }}>
          <Image
            source={{
              uri: 'https://media.istockphoto.com/photos/mature-black-woman-working-from-home-picture-id1300579577',
            }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
            }}
          />
          <View style={{ marginLeft: 30, marginTop: 20 }}>
            <View style={{ flexDirection: 'row' }}>
              <Text
                style={{ fontSize: 18, fontWeight: 'bold', color: 'orange' }}
              >
                Name:
              </Text>
              <Text style={{ fontSize: 18 }}>
                {userProfile ? userProfile.name : ''}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            marginLeft: 20,
            marginTop: 50,
            fontSize: 17,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <FontAwesome name='phone-square' size={24} color='#8e9094' />
            <Text style={{ marginLeft: 10, color: '#868687' }}>
              {userProfile ? userProfile.phone : ''}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 10,
            }}
          >
            <Zocial name='email' size={24} color='#8e9094' />
            <Text style={{ marginLeft: 10, fontSize: 17, color: '#868687' }}>
              {userProfile ? userProfile.email : ''}
            </Text>
          </View>
        </View>
        <View style={{ width: '80%', alignSelf: 'center', marginTop: 50 }}>
          <TouchableOpacity
            onPress={() => [
              AsyncStorage.removeItem('jwt'),
              logoutUser(context.dispatch),
            ]}
          >
            <Text
              style={{
                backgroundColor: '#f25e30',
                textAlign: 'center',
                borderRadius: 10,
                padding: 15,
                fontSize: 18,
                color: 'white',
                marginTop: 10,
              }}
            >
              SignOut
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default UserProfile;
