import axios from 'axios';
import { 
  USER_SIGNIN_SUCCESS, 
  USER_SIGNIN_FAIL,
  USER_PROFILE_FETCH_SUCCESS,
  USER_PROFILE_FETCH_FAIL,
  USER_PROFILE_UPDATE_SUCCESS,
  USER_PROFILE_UPDATE_FAIL,
  USER_PASSWORD_UPDATE_SUCCESS,
  USER_PASSWORD_UPDATE_FAIL,
} from '../actions/ActionTypes';
import AsyncStorage from '@react-native-community/async-storage';
import { HOST, PORT, CONTEXT_PATH } from 'react-native-dotenv';


export const signInSubmit = ({ email, password }, callback) => {
  return (dispatch) => {
    console.log(HOST);
    axios.post(`http://${HOST}:${PORT}${CONTEXT_PATH}/users/login`, {
      email: email,
      password: password
    }).then((response) => {
      const userId = response.headers.userid;
      const jwt = response.headers.authorization;
      AsyncStorage.setItem('userId', userId);
      AsyncStorage.setItem('jwt', jwt);
      dispatch({ type: USER_SIGNIN_SUCCESS, payload: response.headers });
      callback();
    }).catch((err) => {
      console.log('err', err);
      dispatch({ type: USER_SIGNIN_FAIL });
    });
  }
}

export const profileFetch = () => {
  return async (dispatch) => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const jwt = await AsyncStorage.getItem('jwt');

      const response = await axios
        .get(`http://${HOST}:${PORT}${CONTEXT_PATH}/users/${userId}`, {
          headers: {
            "Authorization" : jwt
          }
        });
      dispatch({ type: USER_PROFILE_FETCH_SUCCESS, payload: response.data });
    } catch(err) {
      console.log('err', err);
    }
  }
}

export const profileUpdate = ({ username, email, firstName, lastName }) => {
  return async (dispatch) => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const jwt = await AsyncStorage.getItem('jwt');

      const response = await axios
        .put(`http://${HOST}:${PORT}${CONTEXT_PATH}/users/${userId}`, {
          username: username,
          email: email,
          firstName: firstName,
          lastName: lastName
        },
        {
          headers: {
            "Authorization" : jwt
          }
      });
      dispatch({ type: USER_PROFILE_UPDATE_SUCCESS, payload: response.data });
    } catch(err) {
      console.log('err', err);
    }
  }
}

export const passwordUpdate = ({ newPassword }) => {
  return async (dispatch) => {
    try {

      const userId = await AsyncStorage.getItem('userId');
      const jwt = await AsyncStorage.getItem('jwt');
      const userInfo = await axios
        .get(`http://${HOST}:${PORT}${CONTEXT_PATH}/users/${userId}`, {
          headers: {
            "Authorization" : jwt
          }
        });

      const email = userInfo.data.email;
      // console.log("password update email:" + email);
      const response = await axios
        .put(`http://${HOST}:${PORT}${CONTEXT_PATH}/users/${userId}/password-update`, {
          email: email,
          password: newPassword,
        },
        {
          headers: {
            "Authorization" : jwt
          }
      });
      dispatch({ type: USER_PASSWORD_UPDATE_SUCCESS, payload: response.data });
    } catch(err) {
      console.log('err', err);
    }
  }
}
