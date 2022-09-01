import styles from '../styles/home.module.css';
import CommentIcon from '@mui/icons-material/Comment';
import FavoriteIcon from '@mui/icons-material/Favorite';
import React, { useEffect, useState } from 'react';
import { usePosts } from '../hooks';
import { useToasts } from 'react-toast-notifications';

import Comments from '../Components/Comments';
import { Link } from 'react-router-dom';
import { createComment, toggleLike } from '../api';

const Posts = ({ post }) => {
  const posts = usePosts();
  const [comment, setComment] = useState('');
  const [creatingComment, setCreatingComment] = useState(false);
  const { addToast } = useToasts();

  const handleAddComment = async (e) => {
    if (e.key === 'Enter') {
      setCreatingComment(true);

      const res = await createComment(comment, post._id);
      console.log('Response after adding comment:', res);

      if (res.success) {
        setComment('');
        posts.addComment(res.data.comment, post._id); //global state

        addToast('Comment added successfully!', {
          appearance: 'success',
        });
      } else {
        addToast(res.message, {
          appearance: 'error',
        });
      }

      setCreatingComment(false);
    }
  };

  const handlePostLike = async () => {
    const res = await toggleLike(post._id, 'Post');
    console.log('Response after toggling like button:', res);

    if (res.success) {
      if (res.data.deleted) {
        //like removed successfully
        addToast('Like removed successfully!', {
          appearance: 'success',
        });
      } else {
        //* like added
        addToast('Like added successfully!', {
          appearance: 'success',
        });
      }
    } else {
      addToast(res.message, {
        appearance: 'error',
      });
    }
  };

  return (
    <div>
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
              <FavoriteIcon onClick={handlePostLike} />
              <span>{post.likes.length}</span>
            </div>

            <div className={styles.postCommentsIcon}>
              <CommentIcon />
              <span>{post.comments.length}</span>
            </div>
          </div>
          <div className={styles.postCommentBox}>
            <input
              placeholder="Start typing a comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              onKeyDown={handleAddComment} //* when any key is pressed, this event is handle
            />
          </div>

          <div className={styles.postCommentsList}>
            <Comments comments={post.comments} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Posts;
