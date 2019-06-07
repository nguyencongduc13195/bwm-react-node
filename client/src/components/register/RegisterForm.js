import React from "react";
import { Field, reduxForm } from "redux-form";
import { renderField } from "../shared/form/BWMInput";
import { BwmResErros } from "../shared/form/BWMResError";
const RegisterForm = props => {
  const { handleSubmit, pristine, submitting, submitCb, valid, errors } = props;
  return (
    <form onSubmit={handleSubmit(submitCb)}>
      <Field
        name="username"
        label="Username"
        component={renderField}
        className="form-control"
        type="text"
      />
      <Field
        name="email"
        label="Email"
        component={renderField}
        className="form-control"
        type="email"
      />
      <Field
        name="password"
        label="Password"
        component={renderField}
        className="form-control"
        type="password"
      />
      <Field
        label="Confirm Password"
        name="confirmPassword"
        component={renderField}
        className="form-control"
        type="password"
      />
      <button
        className="btn btn-bwm btn-form"
        type="submit"
        disabled={!valid || pristine || submitting}
      >
        Register
      </button>
      <BwmResErros errors={errors} />
    </form>
  );
};
const validate = values => {
  const errors = {};
  if (values.username && values.username.length < 4) {
    errors.username = "Username min length is 4 characters!";
  }
  if (!values.email) {
    errors.email = "Please enter email!";
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = "Please enter password confirmation!";
  }
  if (values.password !== values.confirmPassword) {
    errors.password = "Passwords must be the same";
  }
  return errors;
};
export default reduxForm({
  form: "registerForm",
  validate
})(RegisterForm);
