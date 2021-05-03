import { withAuthorization } from "../Session";

const HomePage = () => (
  <div>
    <p>Home</p>
    <p>The Home Page is accessible by every signed in user.</p>
  </div>
);

export default withAuthorization(authUser => !!authUser)(HomePage);