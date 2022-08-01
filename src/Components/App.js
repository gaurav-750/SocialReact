import React, { useEffect } from 'react';

import { getPosts } from '../api/index';

const App = () => {
  useEffect(() => {
    async function fetchPost() {
      const response = await getPosts();
      console.log('response', response);
    }

    fetchPost();
  }, []);

  return <div>App</div>;
};

export default App;
