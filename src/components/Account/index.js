import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';
import { AuthUserContext, withAuthorization } from '../Session';

const AccountPage = () => (
  <AuthUserContext.Consumer>
    { authUser => (
      <div>
        <h1>Account Page : {authUser.email}</h1>
        <PasswordForgetForm /> {/* does this make sense??? */}
        <PasswordChangeForm />
      </div>
    )}
  </AuthUserContext.Consumer>
);

export default withAuthorization(authUser => !!authUser)(AccountPage);