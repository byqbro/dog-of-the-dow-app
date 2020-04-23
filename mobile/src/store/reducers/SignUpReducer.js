import { USER_SIGNUP_SUCCESS, USER_SIGNUP_FAIL } from '../actions/ActionTypes';

const initialState = {
  userSignUpSuccess: false,
  error: '',
};

const SignUpReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_SIGNUP_SUCCESS:
      return { ...state, ...initialState, userSignUpSuccess: true };
    case USER_SIGNUP_FAIL:
      return { ...state, error : 'Sign Up Failed' };
    default:
      return state;
  }
};

export default SignUpReducer;
