import React from 'react';
import styles from '../styles/home.module.css';

const Comments = ({ comments }) => {
  console.log('Comments in Component:', comments);
  return (
    <div>
      {comments.map((comment) => (
        <div
          className={styles.postCommentsItem}
          key={`post-comment-${comment._id}`}
        >
          <div className={styles.postCommentHeader}>
            <span className={styles.postCommentAuthor}>
              {comment.user.name}
            </span>
            <span className={styles.postCommentTime}>a minute ago</span>
            <span className={styles.postCommentLikes}>
              {comment.likes.length}
            </span>
          </div>

          <div className={styles.postCommentContent}>{comment.content}</div>
        </div>
      ))}
    </div>
  );
};

export default Comments;
