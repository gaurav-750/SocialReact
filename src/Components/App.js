import React, { useEffect, useState } from 'react';

import { getPosts } from '../api';
import { Home } from '../pages/index';
import Loader from './Loader';
import Navbar from './Navbar';

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
      <Navbar />
      <Home posts={posts} />
    </div>
  );
};

export default App;
