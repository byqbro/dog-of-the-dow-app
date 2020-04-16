import axios from 'axios';
import { 
  USER_SIGNIN_SUCCESS, 
  USER_SIGNIN_FAIL,
  USER_PASSWORD_UPDATE_SUCCESS,
  USER_PASSWORD_UPDATE_FAIL,
  USER_SETTING_UPDATE_SUCCESS,
  USER_SETTING_UPDATE_FAIL,
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
