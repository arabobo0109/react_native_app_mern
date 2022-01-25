import { style, text } from 'dom-helpers';
import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FormContainer from '../../Shared/Form/FormContainer';
import Input from '../../Shared/Form/Input';
import Error from '../../Shared/Error';
import AuthGlobal from '../../Context/store/AuthGlobal';
import { loginUser } from '../../Context/Actions/Auth.Action';

const LoginScreen = (props) => {
  const context = useContext(AuthGlobal);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  useEffect(() => {
    if (context.stateUser.isAuthenticated) {
      props.navigation.navigate('UserProfile');
    }
  }, [context.stateUser.isAuthenticated]);

  const handleSubmit = () => {
    const user = {
      email,
      password,
    };

    if (email === '' || password === '') {
      setError('Please Fill in your credentials');
    } else {
      loginUser(user, context.dispatch);
    }
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
        marginBottom: 10,
      }}
    >
      <Text
        style={{
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: 20,
        }}
      >
        Login
      </Text>
      {error ? <Error message={error} /> : null}
      <Input
        placeholder={'Enter Email'}
        name={'email'}
        id={'email'}
        value={email}
        onChangeText={(text) => setEmail(text)}
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
        <TouchableOpacity onPress={() => handleSubmit()}>
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
            Login
          </Text>
        </TouchableOpacity>
        <View
          style={{
            marginTop: 30,
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          <Text style={{ fontSize: 15 }}>Don't Have an account?</Text>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('RegisterScreen')}
          >
            <Text style={{ fontSize: 15, color: '#007ade', marginLeft: 12 }}>
              Register Here.
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  buttonView: {
    width: '80%',
    alignSelf: 'center',
  },
});

export default LoginScreen;
