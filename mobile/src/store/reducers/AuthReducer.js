import { 
  USER_SIGNIN_SUCCESS, 
  USER_SIGNIN_FAIL, 
  USER_PASSWORD_UPDATE_SUCCESS,
  USER_SETTING_UPDATE_SUCCESS,
} from '../actions/ActionTypes';

const initialState = {
  userId: -1,
  jwt:'',
  username: '',
  email: '',
  encrypterPassword: '',
  firstName: '',
  lastName: '',
  createAt: '',
  updateAt: '',
  error: '',
  userSignInSuccess: false,
  userUpdateSettingSuccess: false,
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_SIGNIN_SUCCESS:
      console.log('userinfo:', action.payload);
      const userInfo = action.payload;
      return {...state, ...initialState, userId: userInfo.id, jwt: userInfo.jwt };
    case USER_SIGNIN_FAIL:
      return {...state, error: "Incorrect email or password"};
    case USER_SETTING_UPDATE_SUCCESS:
      return {...state, 
        userId: action.payload.id,
        username: action.payload.username,
        email: action.payload.email,
        encrypterPassword: action.payload.encrypterPassword,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        createAt: action.payload.createAt,
        updateAt: action.payload.updateAt };
    case USER_PASSWORD_UPDATE_SUCCESS:
      return {...state, 
        userId: action.payload.id,
        username: action.payload.username,
        email: action.payload.email,
        encrypterPassword: action.payload.encrypterPassword,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        createAt: action.payload.createAt,
        updateAt: action.payload.updateAt };
    default:
        return state;
  };
};

export default AuthReducer;
