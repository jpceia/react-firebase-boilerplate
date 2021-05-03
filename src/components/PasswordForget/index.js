import { useState } from 'react';
import { Link } from 'react-router-dom';

import { withFirebase } from '../Firebase';

import * as ROUTES from '../../constants/routes';

const PasswordForgetPage = () => (
  <div>
    <h1>PasswordForget</h1>
    <PasswordForgetForm />
  </div>
);

const INITIAL_STATE = {
  email: '',
  error: null,
};

const PasswordForgetFormBase = ({ firebase }) => {

  const [state, setState] = useState({ ...INITIAL_STATE })

  const onSubmit = event => {
    event.preventDefault();

    const { email } = state;

    firebase
      .doPasswordReset(email)
      .then(() => setState({ ...INITIAL_STATE }))
      .catch(error => setState({ ...state, error }));
  }

  const onChange = event => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  };

  const { email, error } = state;
  const isInvalid = email === ''

  return (
    <form onSubmit={onSubmit}>
      <input
        name="email"
        value={email}
        onChange={onChange}
        type="text"
        placeholder="Email Address"
      />
      <button disabled={isInvalid} type="submit">
        Reset My Password
      </button>

      {error && <p>{error.message}</p>}
    </form>
  );
}

const PasswordForgetLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
);

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };