import {
  FETCH_RENTALS_SUCCESS,
  FETCH_RENTAL_BY_ID_SUCCESS,
  FETCH_RENTAL_BY_ID_INIT
} from "../actions/types";
const initialState = {
  rentals: {
    data: []
  },
  rental: {
    data: {}
  }
};
export const rentalsReducer = (state = initialState.rentals, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_RENTALS_SUCCESS:
      return { ...state, data: payload };
    default:
      return state;
  }
};
export const rentalReducer = (state = initialState.rental, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_RENTAL_BY_ID_SUCCESS:
      return { ...state, data: payload };
    case FETCH_RENTAL_BY_ID_INIT:
      return { ...state, data: {} };
    default:
      return state;
  }
};
