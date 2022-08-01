import React from 'react';
import styles from '../styles/home.module.css';
import CommentIcon from '@mui/icons-material/Comment';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonIcon from '@mui/icons-material/Person';

const Home = () => {
  return (
    <div className={styles.postsList}>
      <div className={styles.postWrapper}>
        <div className={styles.postHeader}>
          <div className={styles.postAvatar}>
            {/* <img src="./Images/man.png" alt="user-pic" /> */}
            <PersonIcon fontSize="large" />
            <div>
              <span className={styles.postAuthor}>Gaurav</span>
              <span className={styles.postTime}>a minute ago</span>
            </div>
          </div>

          <div className={styles.postContent}>Post Content</div>

          <div className={styles.postActions}>
            <div className={styles.postLike}>
              <FavoriteIcon />
              <span>5</span>
            </div>

            <div className={styles.postCommentsIcon}>
              <CommentIcon />
              <span>2</span>
            </div>
          </div>
          <div className={styles.postCommentBox}>
            <input placeholder="Start typing a comment" />
          </div>

          <div className={styles.postCommentsList}>
            <div className={styles.postCommentsItem}>
              <div className={styles.postCommentHeader}>
                <span className={styles.postCommentAuthor}>Bill</span>
                <span className={styles.postCommentTime}>a minute ago</span>
                <span className={styles.postCommentLikes}>22</span>
              </div>

              <div className={styles.postCommentContent}>
                This is a random comment
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
