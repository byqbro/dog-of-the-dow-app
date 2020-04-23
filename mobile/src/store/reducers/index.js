import { combineReducers } from 'redux';
import SignUpReducer from './SignUpReducer';
import AuthReducer from './AuthReducer';

export default combineReducers({
  signUp: SignUpReducer,
  auth: AuthReducer,
});
