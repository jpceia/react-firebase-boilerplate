import { useContext, useState } from 'react';
import { FirebaseContext } from '../Firebase';

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

const PasswordChangeForm = () => {
  const firebase = useContext(FirebaseContext);
  const [state, setState] = useState({ ...INITIAL_STATE });

  const onSubmit = event => {
    event.preventDefault();
    const { passwordOne } = state;

    firebase
      .doPasswordUpdate(passwordOne)
      .then(() => setState({ ...INITIAL_STATE }))
      .catch(error => setState({ ...state, error }));
  }

  const onChange = event => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  };

  const { passwordOne, passwordTwo, error } = state;
  const isInvalid = passwordOne === '' || passwordOne !== passwordTwo;

  return (
    <form onSubmit={onSubmit}>
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
        Change My Password
    </button>

      {error && <p>{error.message}</p>}
    </form>
  );
}


export default PasswordChangeForm;