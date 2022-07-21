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
  const firebase = useFirebase();
  const [authUser, setAuthUser] = useSemiPersistentState('authUser');

  useEffect(() => firebase.onAuthUserListener(
    setAuthUser,
    () => setAuthUser(null)
  ), [
    firebase,
    setAuthUser
  ]);

  return (
    <AuthorizationContext.Provider value={authUser}>
      {children}
    </AuthorizationContext.Provider>
  );
}


const AuthorizationCheck = props => {

  const history = useHistory();
  const authUser = useContext(AuthorizationContext);
  const firebase = useFirebase();
  const { children, condition } = props;

  useEffect(() => firebase.onAuthUserListener((user) => {
    if (!condition(user))
      history.push(user ? ROUTES.HOME : ROUTES.SIGN_IN)
  },
    () => history.push(ROUTES.SIGN_IN)
  ), [
    firebase,
    history,
    condition
  ]);

  return condition(authUser) ? children : null;
}

export { AuthorizationContext, AuthorizationWrapper, AuthorizationCheck };