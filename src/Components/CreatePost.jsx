import React from 'react';
import { useState } from 'react';
import styles from '../styles/home.module.css';

const CreatePost = () => {
  const [post, setPost] = useState('');
  const [addingPost, setAddingPost] = useState(false);

  const handleAddPost = async () => {};

  return (
    <div className={styles.createPost}>
      <textarea
        value={post}
        onChange={(e) => setPost(e.target.value)}
        className={styles.addPost}
      ></textarea>

      <div>
        <button
          onClick={handleAddPost}
          disabled={addingPost}
          className={styles.addPostBtn}
        >
          {addingPost ? 'Adding Post..' : 'Add Post'}
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
