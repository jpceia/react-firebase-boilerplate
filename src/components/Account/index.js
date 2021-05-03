import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';

const AccountPage = () => (
  <div>
    <h1>Account Page</h1>
    <PasswordForgetForm /> {/* does this make sense??? */}
    <PasswordChangeForm />
  </div>
);

export default AccountPage;