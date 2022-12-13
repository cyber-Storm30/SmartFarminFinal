import {
  SIGNUP_SUCCESS,
  SIGNUP_START,
  SIGNUP_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_START,
  LOGIN_FAILURE,
  LOGOUT,
} from '../actions/auth';

const initialstate = {
  user: {},
  loading: false,
  error: false,
  errorMessage: '',
  errorType: '',
};

export const authReducer = (state = initialstate, action) => {
  console.log(action);
  switch (action.type) {
    case SIGNUP_START: {
      return {
        user: {},
        loading: true,
        error: false,
      };
    }
    case SIGNUP_SUCCESS: {
      return {
        user: {
          userId: action.payload.id,
          userEmail: action.payload.email,
          displayName: action.payload.displayName,
        },
        loading: false,
        error: false,
      };
    }
    case SIGNUP_FAILURE: {
      return {
        user: {},
        loading: false,
        error: true,
        errorMessage: action.payload.errorMessage || '',
        errorType: action.payload.errorType || '',
      };
    }
    case LOGIN_START: {
      return {
        user: {},
        loading: true,
        error: false,
      };
    }
    case LOGIN_SUCCESS: {
      return {
        user: {
          userId: action.payload.id,
          userEmail: action.payload.email,
          displayName: action.payload.displayName,
        },
        loading: false,
        error: false,
      };
    }
    case LOGIN_FAILURE: {
      return {
        user: {},
        loading: false,
        error: true,
        errorMessage: action.payload.errorMessage || '',
        errorType: action.payload.errorType || '',
      };
    }
    case 'RESET_AUTH_STATE': {
      return {
        user: state.user,
        loading: false,
        error: false,
        errorMessage: '',
        errorType: '',
      };
    }
    case LOGOUT: {
      return {
        user: {},
        loading: false,
        error: false,
        errorMessage: '',
        errorType: '',
      };
    }
    default:
      return state;
  }
};
