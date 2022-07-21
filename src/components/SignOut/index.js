import { useFirebase } from '../Firebase';

const SignOutButton = () => {

  const firebase = useFirebase();

  return (
    <button type="button" onClick={firebase.doSignOut}>
      Sign Out
    </button>
  );
}

export default SignOutButton;