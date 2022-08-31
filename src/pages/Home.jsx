import styles from '../styles/home.module.css';
import CommentIcon from '@mui/icons-material/Comment';
import FavoriteIcon from '@mui/icons-material/Favorite';
import React, { useEffect, useState } from 'react';
import Loader from '../Components/Loader';
import { useAuth, usePosts } from '../hooks';

import propTypes from 'prop-types';
import Comments from '../Components/Comments';
import { Link } from 'react-router-dom';
import FriendList from '../Components/FriendList';
import CreatePost from '../Components/CreatePost';

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
          <div className={styles.postWrapper} key={post._id}>
            <div className={styles.postHeader}>
              <div className={styles.postAvatar}>
                {/* <img src="./Images/man.png" alt="user-pic" /> */}
                <img
                  src={process.env.PUBLIC_URL + 'Images/man.png'}
                  alt="profile"
                />
                <div>
                  <Link
                    //* We r sending the user also to the /user/:userId page

                    to={{
                      pathname: `/user/${post.user._id}`,
                      state: {
                        user: post.user,
                      },
                    }} //* /user/:userId
                    className={styles.postAuthor}
                  >
                    {post.user.name}
                  </Link>
                  <span className={styles.postTime}>a minute ago</span>
                </div>
              </div>

              <div className={styles.postContent}>{post.content}</div>

              <div className={styles.postActions}>
                <div className={styles.postLike}>
                  <FavoriteIcon />
                  <span>{post.likes.length}</span>
                </div>

                <div className={styles.postCommentsIcon}>
                  <CommentIcon />
                  <span>{post.comments.length}</span>
                </div>
              </div>
              <div className={styles.postCommentBox}>
                <input placeholder="Start typing a comment" />
              </div>

              <div className={styles.postCommentsList}>
                <Comments comments={post.comments} />
              </div>
            </div>
          </div>
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
