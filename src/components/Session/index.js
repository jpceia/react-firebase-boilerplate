import { createContext, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { FirebaseContext } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const AuthUserContext = createContext(null);

const AuthenticationGuard = ({ children }) => {
  const firebase = useContext(FirebaseContext);
  const [state, setState] = useState({ authUser: null })

  useEffect(() => {
    const listener = firebase.auth.onAuthStateChanged(
      authUser => {
        authUser
          ? setState({ authUser })
          : setState({ authUser: null });
      });
    return () => listener();
  });

  return (
    <AuthUserContext.Provider value={state.authUser}>
      {children}
    </AuthUserContext.Provider>
  );
}


const AuthorizationGuard = props => {

  const history = useHistory();
  const authUser = useContext(AuthUserContext);
  const firebase = useContext(FirebaseContext);
  const { children, condition } = props;

  useEffect(() => {
    const listener = firebase.auth.onAuthStateChanged(
      authUser => {
        if (!condition(authUser))
          history.push(ROUTES.SIGN_IN);
      });
    return () => listener();
  });

  return condition(authUser) ? children : null;
}

export { AuthUserContext, AuthenticationGuard, AuthorizationGuard };