import styles from '../styles/home.module.css';
import React from 'react';
import Loader from '../Components/Loader';
import { useAuth, usePosts } from '../hooks';

import propTypes from 'prop-types';
import FriendList from '../Components/FriendList';
import CreatePost from '../Components/CreatePost';
import Posts from '../Components/Posts';

const Home = () => {
  const auth = useAuth();
  const posts = usePosts();

  console.log('POSTS FROM USEPOSTS:', posts);

  if (posts.loading) {
    return <Loader />;
  }

  return (
    <div className={styles.home}>
      <div className={styles.postsList}>
        <CreatePost />
        {posts.data.map((post) => (
          <Posts post={post} key={`post-${post._id}`} />
        ))}
      </div>
      {/* if the user is logged in, then only show the friends List */}
      {auth.user && <FriendList />}
    </div>
  );
};

Home.propTypes = {
  posts: propTypes.array.isRequired,
};

export default Home;
