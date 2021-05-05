// import * as ROLES from '../../constants/roles';
import { AuthorizationCheck } from '../Session';

const condition = auth => false // auth && !!auth.roles[ROLES.ADMIN];

const AdminPage = () => (
  <AuthorizationCheck condition={condition}>
    <div>
      <h1>Admin</h1>
      <p>
        Restricted area! Only users with the admin role are authorized.
      </p>
    </div>
  </AuthorizationCheck>
);

export default AdminPage;