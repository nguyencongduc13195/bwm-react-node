import {
  FETCH_RENTAL_BY_ID_INIT,
  FETCH_RENTALS_SUCCESS,
  FETCH_RENTAL_BY_ID_SUCCESS,
  LOGIN_SUCESS,
  LOGIN_FAILURE,
  LOG_OUT
} from "./types";
import AuthService from "../services/auth-service";
import AxiosService from "../services/axios-service";
import axios from "axios";

const axiosInstance = AxiosService.getInstance();
const fetchRentalsSuccess = rentals => {
  return {
    type: FETCH_RENTALS_SUCCESS,
    payload: rentals
  };
};
const fetchRentalByIDSuccess = rental => {
  return {
    type: FETCH_RENTAL_BY_ID_SUCCESS,
    payload: rental
  };
};
export const fetchRentals = () => dispatch => {
  axios
    .get(`/api/v1/rentals`)
    .then(res => dispatch(fetchRentalsSuccess(res.data)));
};
export const fetchRentalByIDInit = () => ({
  type: FETCH_RENTAL_BY_ID_INIT
});
export const fetchRentalByID = rentalID => dispatch => {
  dispatch(fetchRentalByIDInit());
  axios
    .get(`/api/v1/rentals/${rentalID}`)
    .then(res => dispatch(fetchRentalByIDSuccess(res.data)));
};
// AUTH ACTIONS
export const register = userData => {
  return axios
    .post(`/api/v1/users/register`, { ...userData })
    .then(res => res.data, err => Promise.reject(err.response.data.errors));
};
const loginSuccess = () => ({ type: LOGIN_SUCESS });
const loginFailure = errors => ({ type: LOGIN_FAILURE, payload: errors });
export const login = userData => dispatch => {
  return axios
    .post(`/api/v1/users/auth`, { ...userData })
    .then(res => {
      return res.data;
    })
    .then(token => {
      AuthService.saveToken(token);
      dispatch(loginSuccess());
    })
    .catch(err => {
      dispatch(loginFailure(err.response.data.errors));
    });
};
export const checkAuthState = () => dispatch => {
  if (AuthService.isAuthenticated()) {
    dispatch(loginSuccess());
  }
};
export const logOut = () => {
  AuthService.invalidateUser();
  return { type: LOG_OUT };
};
