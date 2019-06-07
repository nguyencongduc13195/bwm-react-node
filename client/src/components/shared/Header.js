import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
const Header = ({ auth, logOut, history }) => {
  const handleLogout = () => {
    logOut();
    history.push('/rentals');
  }
  const renderAuthButtons = () => {
    const { isAuth } = auth;
    if (!isAuth) {
      return (
        <Fragment>
          <Link className="nav-item nav-link active" to="/login">
            <span>
              Login <span className="sr-only">(current)</span>
            </span>
          </Link>
          <Link className="nav-item nav-link" to="/register">
            <span>Register</span>
          </Link>
        </Fragment>
      );
    } else {
      return (
        <a
          className="nav-item nav-link clickable"
          onClick={handleLogout}
        >
          Logout
        </a>
      );
    }
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          BookWithMe
        </Link>
        <form className="form-inline my-2 my-lg-0">
          <input
            className="form-control mr-sm-2 bwm-search"
            type="text"
            placeholder="Try New York"
          />
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            type="submit"
          >
            Search
          </button>
        </form>
        <button
          className="navbar-toggler d-lg-none"
          type="button"
          data-toggle="collapse"
          data-target="#collapsibleNavId"
          aria-controls="collapsibleNavId"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="collapsibleNavId">
          <div className="navbar-nav ml-auto mt-2 mt-lg-0">
            {renderAuthButtons()}
          </div>
        </div>
      </div>
    </nav>
  );
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default withRouter(connect(mapStateToProps)(Header));
