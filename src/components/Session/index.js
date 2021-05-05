import { createContext, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { FirebaseContext } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const AuthorizationContext = createContext(null);

const useSemiPersistentState = (key, initialState = null) => {
  const [value, setValue] = useState(
    JSON.parse(localStorage.getItem(key)) || initialState
  );
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
    return () => localStorage.removeItem(key);
  }, [value, key]);
  return [value, setValue];
};


const AuthorizationWrapper = ({ children }) => {
  const firebase = useContext(FirebaseContext);
  const [authUser, setAuthUser] = useSemiPersistentState('authUser');

  useEffect(() => {
    const listener = firebase.auth.onAuthStateChanged(
      setAuthUser,
      () => setAuthUser(null)
    );
    return () => {
      listener()
    }
  }, [firebase.auth]);

  return (
    <AuthorizationContext.Provider value={authUser}>
      {children}
    </AuthorizationContext.Provider>
  );
}


const AuthorizationCheck = props => {

  const history = useHistory();
  const authUser = useContext(AuthorizationContext);
  const firebase = useContext(FirebaseContext);
  const { children, condition } = props;

  useEffect(() => {
    const listener = firebase.auth.onAuthStateChanged(
      (auth) => {
        if (!condition(auth))
          history.push(auth ? ROUTES.HOME : ROUTES.SIGN_IN)
      },
      () => history.push(ROUTES.SIGN_IN)
    );
    return () => {
      listener()
    }
  }, [
    firebase.auth,
    history,
    condition
  ]);

  return condition(authUser) ? children : null;
}

export { AuthorizationContext, AuthorizationWrapper, AuthorizationCheck };