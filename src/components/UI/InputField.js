import React from "react";
import { Field } from "redux-form";

const renderInput = ({
  input,
  label,
  type,
  className,
  placeholder,
  forwardedRef,
  meta: { touched, error }
}) => {
  const classes = [];
  classes.push(className);

  let validationMessage = null;

  if (touched && error) {
    classes.push("is-invalid");
    validationMessage = <div className="invalid-feedback">{error}</div>;
  }

  return (
    <div className="form-group">
      <label htmlFor={input.name}>{label}</label>
      <input
        {...input}
        type={type}
        className={classes.join(" ")}
        placeholder={placeholder}
        ref={forwardedRef}
      />
      {validationMessage}
    </div>
  );
};

export default React.forwardRef((props, ref) => (
  <Field
    {...props}
    className="form-control"
    component={renderInput}
    forwardedRef={ref}
  />
));
