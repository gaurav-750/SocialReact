import React, { useEffect } from 'react';

// import { getPosts } from '../api/index';
import { getPosts } from '../api';
import { Home } from '../pages/index';

const App = () => {
  useEffect(() => {
    const fetchData = async () => {
      const response = await getPosts();
      console.log('response', JSON.stringify(response));
    };

    // call the function
    fetchData();
  }, []);

  return (
    <div>
      <Home />
    </div>
  );
};

export default App;
