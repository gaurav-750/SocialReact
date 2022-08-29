import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { login as loginUser, signUp, editProfile } from '../api';

import {
  getItemFromLocalStorage,
  removeItemFromLocalStorage,
  setItemInLocalStorage,
} from '../utils/getBody';

import { LOCAL_STORAGE_TOKEN_KEY } from '../utils';
import jwtDecode from 'jwt-decode';

//!Wherever you want to use the context hook => we use 'useContext'
//*Now instead we have made a function 'useAuth' => so we'll call that
export const useAuth = () => {
  return useContext(AuthContext);
};

export const useProvideAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userToken = getItemFromLocalStorage(LOCAL_STORAGE_TOKEN_KEY);
    console.log('Getting the token from ls:', userToken);

    if (userToken) {
      const user = jwtDecode(userToken);
      console.log('token after decoding it', user);

      setUser(user);
    }

    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const res = await loginUser(email, password);

    if (res.success) {
      console.log('After succesfull login:', res.data);
      //setting the user:
      setUser(res.data.user);

      //setting in Localstorage:
      setItemInLocalStorage(
        LOCAL_STORAGE_TOKEN_KEY,
        res.data.token ? res.data.token : null
      );

      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: res.message,
      };
    }
  };

  const signup = async (name, email, password, confirmPassword) => {
    const response = await signUp(name, email, password, confirmPassword);

    if (response.success) {
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: response.message,
      };
    }
  };

  const logout = () => {
    setUser(null);
    removeItemFromLocalStorage(LOCAL_STORAGE_TOKEN_KEY);
  };

  const updateUser = async (userId, name, password, confirmPassword) => {
    const res = await editProfile(userId, name, password, confirmPassword);

    console.log('After update:', res.data);
    if (res.success) {
      //set user
      setUser(res.data.user);

      //setting in user token Localstorage:
      setItemInLocalStorage(
        LOCAL_STORAGE_TOKEN_KEY,
        res.data.token ? res.data.token : null
      );

      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: res.message,
      };
    }
  };

  return {
    user,
    login,
    logout,
    loading,
    signup,
    updateUser,
  };
};
