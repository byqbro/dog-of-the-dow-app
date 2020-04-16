import axios from 'axios';
import { USER_SIGNUP_SUCCESS, USER_SIGNUP_FAIL } from '../actions/ActionTypes';
import { HOST, HOST_PORT, CONTEXT_PATH } from 'react-native-dotenv';

export const signUpSubmit = ({ username, email, password, firstName, lastName }, callback) => {
  return (dispatch) => {
    axios.post(`http://${HOST}:${HOST_PORT}${CONTEXT_PATH}/users`, {
      username: username,
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName
    }).then((response) => {
      dispatch({ type: USER_SIGNUP_SUCCESS, payload: response.data.result });
      callback();
    }).catch((err) => {
      console.log(err);
      dispatch({ type: USER_SIGNUP_FAIL });
    });
  }
}
