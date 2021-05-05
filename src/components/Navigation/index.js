import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { AuthorizationContext } from '../Session';
import SignOutButton from '../SignOut';

const Navigation = () => (
  <div>
    <AuthorizationContext.Consumer>
      {auth => auth ? <NavigationAuth /> : <NavigationNonAuth />}
    </AuthorizationContext.Consumer>
  </div>
);

const NavigationAuth = () => (
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
    <li>
      <SignOutButton />
    </li>
  </ul>
);

const NavigationNonAuth = () => (
  <div>
    <ul>
      <li>
        <Link to={ROUTES.LANDING}>Landing</Link>
      </li>
      <li>
        <Link to={ROUTES.SIGN_IN}>Sign In</Link>
      </li>
    </ul>
  </div>
);

export default Navigation;