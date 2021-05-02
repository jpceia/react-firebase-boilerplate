import { withFirebase } from 's../Firebase';

const SignOutButton = ({ firebase }) => (
  <buton type="button" onClick={firebase.doSignOut}>
    Sign Out
  </buton>
);
export default withFirebase(SignOutButton);