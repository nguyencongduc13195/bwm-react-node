import React from "react";
import { Field, reduxForm } from "redux-form";
import { renderField } from "../shared/form/BWMInput";
import { minLength4, required } from "../shared/form/validators";
import { BwmResErros } from "../shared/form/BWMResError";
const LoginForm = props => {
  const { handleSubmit, pristine, submitting, submitCb, valid, errors } = props;
  return (
    <form onSubmit={handleSubmit(submitCb)}>
      <Field
        name="email"
        label="Email"
        component={renderField}
        className="form-control"
        type="email"
        validate={[required, minLength4]}
      />
      <Field
        name="password"
        label="Password"
        component={renderField}
        className="form-control"
        type="password"
        validate={[required]}
      />
      <button
        className="btn btn-bwm btn-form"
        type="submit"
        disabled={!valid || pristine || submitting}
      >
        Login
      </button>
      <BwmResErros errors={errors} />
    </form>
  );
};

export default reduxForm({
  form: "loginForm"
})(LoginForm);
