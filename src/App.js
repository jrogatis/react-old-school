import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { PrivateRoute } from './PrivateRoute.js';
import { history } from './helpers';
import { HomePage } from './components/HomePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import { userActions } from './actions/user.actions';
import { alertActions } from './actions/alert.actions';

export class App extends React.Component {
  constructor(props) {
    super(props);
    const { logout, clearAlert } = this.props;
    history.listen(location => {
      if (location.state) {
        if (location.state.toLogout === true) {
          logout();
        }
        if (location.state.clearAlert) {
          clearAlert();
        }
      }
    });
  }

  renderAlert = () => {
    const { alert } = this.props;
    return alert && alert.type ? (
      <div className={`alert ${alert.type}`} role="alert">
        {alert.message}
      </div>
    ) : null;
  };

  render() {
    return (
      <Router history={history}>
        <div className="container">
          <div className="col-sm-8 col-sm-offset-2">
            {this.renderAlert()}
            <PrivateRoute exact path="/" component={HomePage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/register" component={RegisterPage} />
          </div>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = ({ alert }) => {
  return {
    alert
  };
};

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(userActions.logout()),
  clearAlert: () => dispatch(alertActions.clear())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
