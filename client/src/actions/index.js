import {
  FETCH_RENTAL_BY_ID_INIT,
  FETCH_RENTALS_SUCCESS,
  FETCH_RENTAL_BY_ID_SUCCESS
} from "./types";
import axios from "axios";
const fetchRentalsSuccess = rentals => {
  return {
    type: FETCH_RENTALS_SUCCESS,
    payload: rentals
  }
};
const fetchRentalByIDSuccess = rental => {
  return {
    type: FETCH_RENTAL_BY_ID_SUCCESS,
    payload: rental
  }
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
  axios.get(`/api/v1/rentals/${rentalID}`).then(res=>dispatch(fetchRentalByIDSuccess(res.data)))
};
