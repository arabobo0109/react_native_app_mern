import jwtDecode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import baseURL from '../../Configuration/baseUrl';
import { ToastAndroid } from 'react-native';

export const SET_CURRENT_USER = 'SET_CURRENT_USER';

const toast = () => {
  ToastAndroid.showWithGravityAndOffset(
    'Error. Make sure you enter the right email and password',
    ToastAndroid.LONG,
    ToastAndroid.BOTTOM,
    25,
    50
  );
};

export const loginUser = (user, dispatch) => {
  fetch(`${baseURL}users/login`, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data) {
        const token = data.data.token;
        AsyncStorage.setItem('jwt', token);
        const decoded = jwtDecode(token);
        dispatch(setCurrentUser(decoded, user));
      } else {
        logoutUser(dispatch);
      }
    })
    .catch((err) => {
      toast();
      logoutUser(dispatch);
    });
};

export const getUserProfile = (id) => {
  fetch(`${baseURL}users/${id}`, {
    method: 'GET',
    body: JSON.stringify(user),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
};

export const logoutUser = (dispatch) => {
  AsyncStorage.removeItem('jwt');
  dispatch(setCurrentUser({}));
};

export const setCurrentUser = (decoded, user) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
    userProfile: user,
  };
};
