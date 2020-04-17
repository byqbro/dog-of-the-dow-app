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
import { HOST, HOST_PORT, CONTEXT_PATH } from 'react-native-dotenv';


export const signInSubmit = ({ email, password }, callback) => {
  return (dispatch) => {
    
    axios.post(`http://${HOST}:${HOST_PORT}${CONTEXT_PATH}/users/login`, {
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
        .get(`http://${HOST}:${HOST_PORT}${CONTEXT_PATH}/users/${userId}`, {
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
        .put(`http://${HOST}:${HOST_PORT}${CONTEXT_PATH}/users/${userId}`, {
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
