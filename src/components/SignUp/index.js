import { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';
import { FirebaseContext } from '../Firebase';


const SignUpPage = () => (
  <div>
    <h1>SignUp</h1>
    <SignUpForm />
  </div>
);

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

const ERROR_CODE_ACCOUNT_EXISTS = 'auth/email-already-in-use';

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with this E-Mail address already exists.
  Try to login with this account instead. If you think the
  account is already used from one of the social logins, try
  to sign in with one of them. Afterward, associate your accounts
  on your personal account page.
`;

const SignUpForm = () => {
  const [state, setState] = useState({ ...INITIAL_STATE });
  const firebase = useContext(FirebaseContext);
  const history = useHistory();

  const onSubmit = event => {
    event.preventDefault();
    const { email, passwordOne } = state;
    
    firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(() => {
        setState({ ...INITIAL_STATE });
        history.push(ROUTES.HOME);
      })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS)
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        setState({ ...state, error })
      });
  }
  
  const onChange = event => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  };

  const {
    username,
    email,
    passwordOne,
    passwordTwo,
    error,
  } = state;

  // The user is only allowed to sign up if both passwords are the same, and
  // if the username, email and at least one password are filled with a string
  const isInvalid =
    passwordOne !== passwordTwo ||
    passwordOne === '' ||
    email === '' ||
    username === '';

  return (
    <form onSubmit={onSubmit}>
      <input
        name="username"
        value={username}
        onChange={onChange}
        type="text"
        placeholder="Full Name"
      />
      <input
        name="email"
        value={email}
        onChange={onChange}
        type="text"
        placeholder="Email Address"
      />
      <input
        name="passwordOne"
        value={passwordOne}
        onChange={onChange}
        type="password"
        placeholder="Password"
      />
      <input
        name="passwordTwo"
        value={passwordTwo}
        onChange={onChange}
        type="password"
        placeholder="Confirm Password"
      />
      <button disabled={isInvalid} type="submit">
        Sign Up
      </button>

      {error && <p>{error.message}</p>}
    </form>
  );
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

export default SignUpPage;

export { SignUpForm, SignUpLink };