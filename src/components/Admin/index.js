import * as ROLES from '../../constants/roles';
import { useEffect, useState } from 'react';
import { useFirebase } from '../Firebase';
import { AuthorizationCheck } from '../Session';

const condition = user => user && !!user.roles.includes(ROLES.ADMIN);

const AdminPage = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const firebase = useFirebase();

  useEffect(() => {
    setLoading(true);
    return firebase.users().onSnapshot(snapshot => { // .onSnapshot
      const usersList = snapshot.docs.map(doc => ({
        ...doc.data(),
        uid: doc.id
      }));
      setLoading(false);
      setUsers(usersList);
    });
  }, [firebase]);

  return (
    <AuthorizationCheck condition={condition}>
      <div>
        <h1>Admin</h1>
        <p>
          The Admin Page is accessible by every signed in admin user.
        </p>
        {loading && <div>Loading ...</div>}
        <UsersList users={users} />
      </div>
    </AuthorizationCheck>
  );
}

const UsersList = ({ users }) => (
  <ul>
    {
      users.map(({ uid, email, username }) => (
        <li key={uid}>
          <span>
            <strong>ID:</strong> {uid}
          </span>
          <span>
            <strong>E-Mail:</strong> {email}
          </span>
          <span>
            <strong>Username:</strong> {username}
          </span>
        </li>
      ))
    }
  </ul>
);

export default AdminPage;