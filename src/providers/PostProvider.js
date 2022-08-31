import { createContext } from 'react';

import { useProvidePosts } from '../hooks/index';

const initialState = {
  posts: [],
  loading: true,
  addPostToState: () => {},
};

export const PostContext = createContext(initialState);

export const PostProvider = ({ children }) => {
  const posts = useProvidePosts();

  return <PostContext.Provider value={posts}>{children}</PostContext.Provider>;
};
