import { useContext } from 'react';
import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';
import { AuthorizationGuard, AuthUserContext } from '../Session';

const AccountPage = () => {
  const user = useContext(AuthUserContext);

  return (
    <AuthorizationGuard condition={authUser => !!authUser}>
      <div>
        <h1>Account Page : {user?.email}</h1>
        <PasswordForgetForm />
        <PasswordChangeForm />
      </div>
    </AuthorizationGuard>
  );
}

export default AccountPage;