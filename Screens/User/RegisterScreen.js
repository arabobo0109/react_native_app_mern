import axios from 'axios';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import baseURL from '../../Configuration/baseUrl';
import Error from '../../Shared/Error';
import Input from '../../Shared/Form/Input';

const RegisterScreen = (props) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const toast = () => {
    ToastAndroid.showWithGravityAndOffset(
      'SuccessFully Registered',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50
    );
  };

  const register = () => {
    if (email === '' || name === '' || phone === '' || password === '') {
      setError('Please fill up all the credentials');
    }
    let user = {
      name,
      email,
      password,
      phone,
      isAdmin: false,
    };

    axios
      .post(`${baseURL}users/register`, user)
      .then((res) => {
        if (res.status == 200) {
          toast();
          setTimeout(() => props.navigation.navigate('LoginScreen'), 5000);
        }
      })
      .catch((error) => {});
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
        paddingTop: 150,
      }}
    >
      <Text
        style={{
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: 20,
        }}
      >
        Register
      </Text>
      <KeyboardAwareScrollView
        viewIsInsideTabBar={true}
        extraHeight={200}
        enableOnAndroid={true}
      >
        <View>{error ? <Error message={error} /> : null}</View>
        <Input
          placeholder={'Enter Email'}
          name={'email'}
          id={'email'}
          value={email}
          onChangeText={(text) => setEmail(text.toLowerCase())}
        />
        <Input
          placeholder={'Enter Your Name'}
          name={'name'}
          id={'name'}
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <Input
          placeholder={'Enter Contact number'}
          name={'phone'}
          id={'phone'}
          value={phone}
          keyboardType={'numeric'}
          onChangeText={(text) => setPhone(text)}
        />
        <Input
          placeholder={'Enter Your Password'}
          name={'password'}
          id={'password'}
          value={password}
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        />
        <View style={styles.buttonView}>
          <TouchableOpacity onPress={() => register()}>
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
              Register
            </Text>
          </TouchableOpacity>
          <View
            style={{
              marginTop: 30,
              flexDirection: 'row',
              justifyContent: 'center',
            }}
          >
            <Text style={{ fontSize: 15 }}>Already Have an Account?</Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('LoginScreen')}
            >
              <Text style={{ fontSize: 15, color: '#007ade', marginLeft: 12 }}>
                Login Here.
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  buttonView: {
    width: '80%',
    alignSelf: 'center',
  },
});

export default RegisterScreen;
