import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import { useAuthorization } from '../Session';
import SignOutButton from '../SignOut';

const Navigation = () => {

  const authUser = useAuthorization();

  return (
    <div>
      { authUser ? <NavigationAuth /> : <NavigationNonAuth />}
    </div>
  );
}

const NavigationAuth = () => {

  const authUser = useAuthorization();

  return (
    <ul>
      <li>
        <Link to={ROUTES.LANDING}>Landing</Link>
      </li>
      <li>
        <Link to={ROUTES.HOME}>Home</Link>
      </li>
      <li>
        <Link to={ROUTES.ACCOUNT}>Account</Link>
      </li>
      {
        !!authUser.roles.includes(ROLES.ADMIN) &&
        <li>
          <Link to={ROUTES.ADMIN}>Admin</Link>
        </li>
      }
      <li>
        <SignOutButton />
      </li>
    </ul>
  );
}

const NavigationNonAuth = () => {

  return (
    <ul>
      <li>
        <Link to={ROUTES.LANDING}>Landing</Link>
      </li>
      <li>
        <Link to={ROUTES.SIGN_IN}>Sign In</Link>
      </li>
    </ul>
  );
}

export default Navigation;