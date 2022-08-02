import React, { useEffect, useState } from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home posts={posts} />}></Route>
        </Routes>

        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="*" element={<Page404 />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
