import * as redux from "redux";
import { rentalsReducer, rentalReducer } from "./rental-reducer";
import { authReducer } from "./auth-reducer";
import { reducer as formReducer } from "redux-form";
const reducer = redux.combineReducers({
  rentals: rentalsReducer,
  rental: rentalReducer,
  form: formReducer,
  auth: authReducer
});
export default reducer;
