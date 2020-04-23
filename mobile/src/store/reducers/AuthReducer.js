import { 
  USER_SIGNIN_SUCCESS, 
  USER_SIGNIN_FAIL,
  USER_PROFILE_FETCH_SUCCESS,
  USER_PROFILE_UPDATE_SUCCESS,
  USER_PASSWORD_UPDATE_SUCCESS,
} from '../actions/ActionTypes';


const initialState = {
  userId: -1,
  jwt:'',
  username: '',
  email: '',
  encrypterPassword: '',
  firstName: '',
  lastName: '',
  error: '',
  userSignInSuccess: false,
  userUpdateProfileSuccess: false,
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_SIGNIN_SUCCESS:
      console.log('userinfo:', action.payload);
      const headers = action.payload;
      return {...state, ...initialState, userId: headers.userid, jwt: headers.authorization };
    case USER_SIGNIN_FAIL:
      return {...state, error: "Incorrect email or password"};
    case USER_PROFILE_FETCH_SUCCESS:
      return {...state,
        username: action.payload.username,
        email: action.payload.email,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName };
    case USER_PROFILE_UPDATE_SUCCESS:
      return {...state,
        username: action.payload.username,
        email: action.payload.email,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName };
    case USER_PASSWORD_UPDATE_SUCCESS:
      return {...state, 
        username: action.payload.username,
        email: action.payload.email,
        encrypterPassword: action.payload.encrypterPassword,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName };
    default:
        return state;
  };
};

export default AuthReducer;
