export const validate = values => {
  const errors = {};
  if (!values.email) {
    errors.email = "Please enter an email";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Please enter a valid email address";
  }

  if (!values.password) {
    errors.password = "Please enter a password";
  }

  if (!values.passwordConfirm) {
    errors.passwordConfirm = "Please enter a password confirmation";
  }

  if (values.passwordConfirm && values.password !== values.passwordConfirm) {
    errors.password = "Passwords must match";
  }
  return errors;
};
