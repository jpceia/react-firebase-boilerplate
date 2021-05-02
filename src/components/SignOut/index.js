import { withFirebase } from '../Firebase';

const SignOutButton = ({ firebase }) => (
  <buton type="button" onClick={firebase.doSignOut}>
    Sign Out
  </buton>
);
export default withFirebase(SignOutButton);