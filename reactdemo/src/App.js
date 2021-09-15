import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import UserEntry from './component/UserEntry';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux'
import { store } from './redux/helper';
import { Redirect } from 'react-router';
import Login from './component/Login';
import Registration from './component/Registration';

function App() {

  const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
      <Route {...rest} render={props => (
        localStorage.getItem("userData") ?
          <Component {...props} />
          : <Redirect to="/sign-in" />
      )} />
    );
  };

  const RedirectRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
      !localStorage.getItem("userData") ?
        <Component {...props} />
        : <Redirect to="/" />
    )} />
  )
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <div className="App">
            <PrivateRoute path='/' component={UserEntry} exact={true} />
            <RedirectRoute path='/sign-in' component={Login} exact={true} />
            <Route path="/register" component={Registration} exact />
          </div>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
