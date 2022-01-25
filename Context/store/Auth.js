import React, { useReducer, useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AuthReducer from '../Reducers/Auth.Reducer';
import { setCurrentUser } from '../Actions/Auth.Action';
import AuthGlobal from './AuthGlobal';

const Auth = (props) => {
  const [stateUser, dispatch] = useReducer(AuthReducer, {
    isAuthenticated: null,
    user: {},
  });
  const [showChild, setShowChild] = useState(false);

  useEffect(() => {
    setShowChild(true);
    if (AsyncStorage.jwt) {
      const decoded = AsyncStorage.jwt ? AsyncStorage.jwt : '';
      if (showChild) {
        dispatch(setCurrentUser(jwtDecode(decoded)));
      }
    }
    return () => setShowChild(false);
  }, []);

  if (!showChild) {
    return null;
  } else {
    return (
      <AuthGlobal.Provider value={{ stateUser, dispatch }}>
        {props.children}
      </AuthGlobal.Provider>
    );
  }
};
export default Auth;
