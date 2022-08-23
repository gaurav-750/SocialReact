import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home, Login } from '../pages/index';
import Signup from '../pages/Signup';
import Navbar from './Navbar';
import Page404 from './Page404';

const App = () => {
  // const [loading, setLoading] = useState(true);

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

          <Route exact path="*">
            <Page404 />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
