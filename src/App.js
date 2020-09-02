import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import asyncComponent from './hoc/asyncComponent/asyncComponent';
import Layout from './hoc/Layout/Layout';
import Logout from './containers/Auth/Logout/Logout';
import Register from './containers/Register/Register';
import * as actions from './store/actions/index';

const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth');
});

class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route path="/logout" component={Logout} />
        <Route path="/register" component={Register} />
        <Route path="/auth" component={asyncAuth} />
        <Redirect to="/" />
      </Switch>
    );

    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch( actions.authCheckState() )
  };
};

export default withRouter( connect( mapStateToProps, mapDispatchToProps )( App ) );