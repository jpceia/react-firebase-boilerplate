import { useContext } from 'react';
import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';
import { AuthorizationCheck, AuthorizationContext } from '../Session';

const AccountPage = () => {
  const authUser = useContext(AuthorizationContext);

  return (
    <AuthorizationCheck condition={auth => !!auth}>
      <div>
        <h1>Account Page : {authUser?.email}</h1>
        <PasswordForgetForm />
        <PasswordChangeForm />
      </div>
    </AuthorizationCheck>
  );
}

export default AccountPage;