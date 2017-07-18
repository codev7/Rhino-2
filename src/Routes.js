import Route from 'react-router/es/Route';
import Redirect from 'react-router/es/Redirect';
import Router from 'react-router/es/Router';
import { ReduxAsyncConnect } from 'redux-connect';
import { object } from 'prop-types';

import App from './containers/App';
import LoginPage from './containers/LoginPage';
import MainLayout from './containers/MainLayout';
import SettingsPage from './containers/SettingsPage';
import ClientListPage from './containers/ClientListPage';
import ClientEditPage from './containers/ClientEditPage';
import NewClientPage from './containers/NewClientPage';
import ToolListPage from './containers/ToolListPage';
import NewToolPage from './containers/NewToolPage';
import ToolEditPage from './containers/ToolEditPage';

function reduxAsyncConnect(props) {
  return (
    <ReduxAsyncConnect
      {...props}
      filter={item => !item.deferred}
    />
  );
}

const propTypes = {
  history: object.isRequired,
};

const Routes = ({ history }) => (
  <Router
    render={reduxAsyncConnect}
    history={history}
  >
    <Redirect from="/" to="/clients" />
    <Route component={MainLayout}>
      <Route path="/" component={App}>
        <Route path="settings" component={SettingsPage} />

        <Route path="clients" component={ClientListPage} />
        <Route path="clients/new" component={NewClientPage} />
        <Route path="clients/:clientId" component={ClientEditPage} />

        <Route path="tools" component={ToolListPage} />
        <Route path="tools/new" component={NewToolPage} />
        <Route path="tools/:toolId" component={ToolEditPage} />
      </Route>
      <Route path="/login" component={LoginPage} />
    </Route>
  </Router>
);

Routes.propTypes = propTypes;

export default Routes;
