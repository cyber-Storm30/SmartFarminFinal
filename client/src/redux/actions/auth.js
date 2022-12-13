import {baseURL} from '../../Services/apiClient';
import axios from 'axios';

export const SIGNUP_START = 'SIGNUP_START';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';
export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';

export const signupStart = (user, navigation) => async dispatch => {
  try {
    dispatch({type: SIGNUP_START});
    const {data: userData} = await axios.post(`${baseURL}/user/signup`, user);
    console.log('userData', userData);
    if (userData.status === 400) {
      dispatch({
        type: SIGNUP_FAILURE,
        payload: {
          errorMessage: 'Email is already registered',
          errorType: 'email',
        },
      });
      return;
    }

    if (userData.error) {
      dispatch({
        type: SIGNUP_FAILURE,
        payload: {
          errorMessage: userData.message,
          errorType: userData.type,
        },
      });
      return;
    }

    if (user && userData.status === 201) {
      dispatch({
        type: SIGNUP_SUCCESS,
        payload: {
          id: userData._id,
          email: userData.email,
          displayName: user.name,
        },
      });
      navigation.navigate('Home');
    }
  } catch (err) {
    console.log(err);
    dispatch({
      type: SIGNUP_FAILURE,
      payload: {
        errorMessage: err.message,
        errorType: err.name,
      },
    });
  }
};

export const loginStart = (user, navigation) => async dispatch => {
  try {
    dispatch({type: LOGIN_START});
    const {data: userData} = await axios.post(`${baseURL}/user/signin`, user);
    if (userData.error) {
      dispatch({
        type: LOGIN_FAILURE,
        payload: {
          errorMessage: userData.message,
          errorType: userData.type,
        },
      });
      return;
    }
    if (user && userData.status === 200) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          id: userData._id,
          email: userData.email,
          displayName: user.name,
        },
      });
      navigation.navigate('Home');
    }
  } catch (err) {
    console.log(err);
    dispatch({
      type: LOGIN_FAILURE,
      payload: {
        errorMessage: err.message,
        errorType: err.name,
      },
    });
  }
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
};
