import { AuthorizationGuard } from "../Session";

const HomePage = () => (
  <AuthorizationGuard condition={authUser => !!authUser}>
    <div>
      <p>Home</p>
      <p>The Home Page is accessible by every signed in user.</p>
    </div>
  </AuthorizationGuard>
);

export default HomePage;