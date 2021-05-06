import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { FirebaseContext } from '../Firebase';

import * as ROUTES from '../../constants/routes';
import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';


const SignInPage = () => (
  <div>
    <h1>SignIn</h1>
    <SignInForm />
    <SignInGoogle />
    <PasswordForgetLink />
    <SignUpLink />
  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

const SignInForm = () => {
  const [state, setState] = useState({ ...INITIAL_STATE });
  const firebase = useContext(FirebaseContext);
  const history = useHistory();

  const onSubmit = event => {
    event.preventDefault();

    const { email, password } = state;

    firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        setState({ ...INITIAL_STATE });
        history.push(ROUTES.HOME);
      })
      .catch(error => setState({ ...state, error }));
  }

  const onChange = event => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  };

  const { email, password, error } = state;
  const isInvalid = password === '' || email === ''

  return (
    <form onSubmit={onSubmit}>
      <input
        name="email"
        value={email}
        onChange={onChange}
        type="email"
        placeholder="Email Address"
      />
      <input
        name="password"
        value={password}
        onChange={onChange}
        type="password"
        placeholder="Password"
      />
      <button disabled={isInvalid} type="submit">
        Sign In
        </button>

      {error && <p>{error.message}</p>}
    </form>
  );
}


const SignInGoogle = () => {
  const [error, setError] = useState(null);
  const firebase = useContext(FirebaseContext);
  const history = useHistory();

  const onSubmit = event => {
    event.preventDefault();
    firebase.doSignInWithGoogle()
      .then(socialAuthUser => {
        const user = socialAuthUser.user;
        // Create a user in Firestore
        firebase.user(user.uid).set({
          username: user.displayName,
          email: user.email,
          roles: []
        });
      })
      .then(socialAuthUser => {
        setError(null);
        history.push(ROUTES.HOME);
      })
      .catch(setError)
  }

  return (
    <form onSubmit={onSubmit}>
      <button type="submit">Sign In with Google</button>
      {error && <p>{error.message}</p>}
    </form>
  );
}


export { SignInForm, SignInGoogle };

export default SignInPage;