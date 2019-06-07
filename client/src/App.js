import React, { Component } from "react";
import "./App.css";
// router-dom
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import { ProtectedRoute } from "./components/shared/auth/ProtectedRoute";
import { LoggedInRoute } from "./components/shared/auth/LoggedInRoute";
// components
import Header from "./components/shared/Header";
import RentalListing from "./components/rental/rental-listing/RentalListing";
import RentalDetail from "./components/rental/rental-detail/RentalDetail";
import Login from "./components/login/Login";
import Register from "./components/register/Register";

// redux
import * as redux from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import reducer from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import * as actions from "./actions";
const store = redux.createStore(
  reducer,
  composeWithDevTools(redux.applyMiddleware(thunk))
);
class App extends Component {
  componentWillMount() {
    store.dispatch(actions.checkAuthState());
  }
  onLogout = () => {
    store.dispatch(actions.logOut());
  };
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Header logOut={this.onLogout} />
            <div className="container">
              <Route exact path="/" render={() => <Redirect to="/rentals" />} />
              <Route exact path="/rentals" component={RentalListing} />
              <ProtectedRoute
                exact
                path="/rental/:id"
                component={RentalDetail}
              />
              <Route exact path="/login" component={Login} />
              <LoggedInRoute exact path="/register" component={Register} />
            </div>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
