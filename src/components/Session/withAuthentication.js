import { Component } from 'react';
import { withFirebase } from "../Firebase";
import AuthUserContext from "./context";

const withAuthentication = WrappedComponent => {
  class WithAuthentication extends Component {

    constructor(props) {
      super(props);
      this.state = { authUser: null };
    }

    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(
        authUser => {
          authUser
            ? this.setState({ authUser })
            : this.setState({ authUser: null });
        },
      );
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      return (
        <AuthUserContext.Provider value={this.state.authUser}>
          <WrappedComponent {...this.props} />
        </AuthUserContext.Provider>
      );
    }
  }
  return withFirebase(WithAuthentication);
};

export default withAuthentication;