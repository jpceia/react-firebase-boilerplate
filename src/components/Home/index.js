import { AuthorizationCheck } from "../Session";

const HomePage = () => (
  <AuthorizationCheck condition={authUser => !!authUser}>
    <div>
      <p>Home</p>
      <p>The Home Page is accessible by every signed in user.</p>
    </div>
  </AuthorizationCheck>
);

export default HomePage;