import React from 'react';
import { useState } from 'react';
import { createPost } from '../api';
import styles from '../styles/home.module.css';
import { useToasts } from 'react-toast-notifications';
import { usePosts } from '../hooks';

const CreatePost = () => {
  const [post, setPost] = useState('');
  const [addingPost, setAddingPost] = useState(false);
  const { addToast } = useToasts();
  const posts = usePosts();

  const handleAddPost = async () => {
    setAddingPost(true);
    if (post == '') {
      return addToast('Post cannot be empty!', {
        appearance: 'error',
      });
    }

    const res = await createPost(post);
    console.log('Response after createPost:', res);

    if (res.success) {
      setPost('');
      posts.addPostToState(res.data.post);

      addToast('Post Created Successfully!', {
        appearance: 'success',
      });
    } else {
      return addToast(res.message, {
        appearance: 'error',
      });
    }

    setAddingPost(false);
  };

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
