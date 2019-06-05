import * as redux from "redux";
import { rentalsReducer, rentalReducer } from "./rental-reducer";
const reducer = redux.combineReducers({
  rentals: rentalsReducer,
  rental: rentalReducer
});
export default reducer;
