import {
  FETCH_RENTALS,
  FETCH_RENTAL_BY_ID,
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
    case FETCH_RENTALS:
      return { ...state, data: payload };
    default:
      return state;
  }
};
export const rentalReducer = (state = initialState.rental, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_RENTAL_BY_ID:
      return { ...state, data: payload };
    case FETCH_RENTAL_BY_ID_INIT:
      return { ...state, data: {} };
    default:
      return state;
  }
};
