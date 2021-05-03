import { useContext } from 'react';
import { FirebaseContext } from '../Firebase';

const SignOutButton = () => {

  const firebase = useContext(FirebaseContext);

  return (
    <buton type="button" onClick={firebase.doSignOut}>
      Sign Out
    </buton>
  );
}

export default SignOutButton;