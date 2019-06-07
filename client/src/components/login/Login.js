import React, { Component } from "react";
import LoginForm from "./LoginForm";
import { connect } from "react-redux";
import { login } from "../../actions";
import { Redirect } from "react-router-dom";
class Login extends Component {
  loginUser = data => {
    this.props.dispatch(login(data));
  };
  render() {
    const { isAuth, errors } = this.props.auth;
    const { successRegister } = this.props.location.state || false;
    if (isAuth) {
      return <Redirect to="/rentals" />;
    }
    return (
      <section id="login">
        <div className="bwm-form">
          <div className="row">
            <div className="col-md-5">
              <h1>Login</h1>
              {successRegister && (
                <div className="alert alert-success">
                  You have been successfully registered, please login now.
                </div>
              )}
              <LoginForm submitCb={this.loginUser} errors={errors} />
            </div>
            <div className="col-md-6 ml-auto">
              <div className="image-container">
                <h2 className="catchphrase">
                  Hundreds of awesome places in reach of few clicks.
                </h2>
                <img src={process.env.PUBLIC_URL+"/img/login-image.jpg"} alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
const mapStateToProps = state => ({ auth: state.auth });
export default connect(mapStateToProps)(Login);
