import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home, Login } from '../pages/index';
import Signup from '../pages/Signup';
import Navbar from './Navbar';
import Page404 from './Page404';
import Settings from '../pages/Settings';
import UserProfile from '../pages/UserProfile';

const App = () => {
  // const [loading, setLoading] = useState(true);

  console.log('Inside App Component!');
  return (
    <div>
      <Router>
        <Navbar />

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route exact path="/login">
            <Login />
          </Route>

          <Route exact path="/signup">
            <Signup />
          </Route>

          <Route exact path="/user/:userId">
            <UserProfile />
          </Route>

          <Route exact path="/settings">
            <Settings />
          </Route>

          <Route exact path="*">
            <Page404 />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
