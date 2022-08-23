import styles from '../styles/home.module.css';
import CommentIcon from '@mui/icons-material/Comment';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { getPosts } from '../api';
import React, { useEffect, useState } from 'react';
import Loader from '../Components/Loader';
import { useAuth } from '../hooks';

import propTypes from 'prop-types';
import Comments from '../Components/Comments';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const auth = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const response = await getPosts();
      console.log('response in home', response);

      if (response.success) {
        setPosts(response.data.posts);
        setLoading(false);
      }
    };

    // call the function
    fetchData();
  }, []);

  if (auth.loading) {
    return <Loader />;
  }

  console.log(posts, 'posts');
  return (
    <div className={styles.postsList}>
      {posts.map((post) => (
        <div className={styles.postWrapper} key={post._id}>
          <div className={styles.postHeader}>
            <div className={styles.postAvatar}>
              {/* <img src="./Images/man.png" alt="user-pic" /> */}
              <img
                src={process.env.PUBLIC_URL + 'Images/man.png'}
                alt="profile"
              />
              <div>
                <span className={styles.postAuthor}>{post.user.name}</span>
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
  );
};

Home.propTypes = {
  posts: propTypes.array.isRequired,
};

export default Home;
