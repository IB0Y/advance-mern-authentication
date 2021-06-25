import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Screens
import LoginScreen from './components/screens/LoginScreen';
import RegisterScreen from './components/screens/RegisterScreen';
import ForgotPasswordScreen from './components/screens/ForgotPasswordScreen';
import ResetPasswordScreen from './components/screens/ResetPasswordScreen';
import PrivateScreen from './components/screens/PrivateScreen';

// Routing
import PrivateRoute from './components/routing/PrivateRoute';
function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <PrivateRoute exact path="/" component={PrivateScreen} />
          <Route exact path="/login" component={LoginScreen} />
          <Route exact path="/register" component={RegisterScreen} />
          <Route exact path="/forgotPassword" component={ForgotPasswordScreen} />
          <Route exact path="/resetPassword/:resetToken" component={ResetPasswordScreen} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
