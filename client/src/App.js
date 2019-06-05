import React from "react";
import "./App.css";
import Header from "./components/shared/Header";
import RentalListing from "./components/rental/rental-listing/RentalListing";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import RentalDetail from "./components/rental/rental-detail/RentalDetail";
import * as redux from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import reducer from "./reducers";
import { composeWithDevTools } from 'redux-devtools-extension';
function App() {
  const store = redux.createStore(
    reducer,
    composeWithDevTools(redux.applyMiddleware(thunk))
  );
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Header />
          <div className="container">
            <Route exact path="/" render={() => <Redirect to="/rentals" />} />
            <Route exact path="/rentals" component={RentalListing} />
            <Route exact path="/rental/:id" component={RentalDetail} />
          </div>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
