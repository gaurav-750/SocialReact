import React, { useEffect, useState } from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { getPosts } from '../api';
import { Home, Login } from '../pages/index';
import Loader from './Loader';
import Navbar from './Navbar';
import Page404 from './Page404';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getPosts();
      console.log('response', response);

      if (response.success) {
        setPosts(response.data.posts);
        setLoading(false);
      }
    };

    // call the function
    fetchData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <Router>
        <Navbar />

        <Switch>
          <Route exact path="/">
            <Home posts={posts} />
          </Route>

          <Route exact path="/login">
            <Login />
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
