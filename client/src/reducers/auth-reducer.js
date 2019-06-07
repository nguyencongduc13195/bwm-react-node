import { LOGIN_FAILURE, LOGIN_SUCESS, LOG_OUT } from "../actions/types";
const initialState = {
  isAuth: false,
  errors: []
};
export const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_SUCESS:
      return Object.assign({}, state, {
        isAuth: true,
        errors: []
      });
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        errors: payload
      });
    case LOG_OUT:
      return Object.assign({}, state, {
        isAuth: false
      });
    default:
      return state;
  }
};
