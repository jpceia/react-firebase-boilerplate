import * as ROLES from '../../constants/roles';
import { AuthorizationGuard } from '../Session';

const AdminPage = () => (
  <AuthorizationGuard condition={user => user && !!user.roles[ROLES.ADMIN]}>
    <div>
      <h1>Admin</h1>
      <p>
        Restricted area! Only users with the admin role are authorized.
      </p>
    </div>
  </AuthorizationGuard>
);

export default AdminPage;