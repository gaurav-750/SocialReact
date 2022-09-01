import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import {
  login as loginUser,
  signUp,
  editProfile,
  fetchUserFriends,
  getPosts,
} from '../api';

import {
  getItemFromLocalStorage,
  removeItemFromLocalStorage,
  setItemInLocalStorage,
} from '../utils/getBody';

import { LOCAL_STORAGE_TOKEN_KEY } from '../utils';
import jwtDecode from 'jwt-decode';
import { PostContext } from '../providers/PostProvider';

//!Wherever you want to use the context hook => we use 'useContext'
//*Now instead we have made a function 'useAuth' => so we'll call that
export const useAuth = () => {
  return useContext(AuthContext);
};

export const useProvideAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const userToken = getItemFromLocalStorage(LOCAL_STORAGE_TOKEN_KEY);
      console.log('Getting the token from ls:', userToken);

      if (userToken) {
        const user = jwtDecode(userToken);
        console.log('token after decoding it', user);

        //*Fetching user friends : as after decoding the user, we do not get friends array
        const response = await fetchUserFriends();
        console.log('After fetching user friends', response);

        console.log('response.friends:', response.data.friends);

        let friendships = [];
        if (response.success) {
          friendships = response.data.friends;
        } else {
          friendships = [];
        }

        setUser({
          ...user,
          friendships,
        });
      }

      setLoading(false);
    };

    getUser();
  }, []);

  const login = async (email, password) => {
    const res = await loginUser(email, password);

    if (res.success) {
      console.log('After succesfull login:', res.data);
      //setting the user:
      setUser(res.data.user);

      //setting in Localstorage:
      setItemInLocalStorage(
        LOCAL_STORAGE_TOKEN_KEY,
        res.data.token ? res.data.token : null
      );

      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: res.message,
      };
    }
  };

  const signup = async (name, email, password, confirmPassword) => {
    const response = await signUp(name, email, password, confirmPassword);

    if (response.success) {
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: response.message,
      };
    }
  };

  const logout = () => {
    setUser(null);
    removeItemFromLocalStorage(LOCAL_STORAGE_TOKEN_KEY);
  };

  const updateUser = async (userId, name, password, confirmPassword) => {
    const res = await editProfile(userId, name, password, confirmPassword);

    console.log('After update:', res.data);
    if (res.success) {
      //set user
      setUser(res.data.user);

      //setting in user token Localstorage:
      setItemInLocalStorage(
        LOCAL_STORAGE_TOKEN_KEY,
        res.data.token ? res.data.token : null
      );

      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: res.message,
      };
    }
  };

  const updateUserFriend = async (addFriend, friend) => {
    //* addFriend is gonna be a boolean => true if we need to add, false if we need to remove the friend

    if (addFriend) {
      //* add the friend
      setUser({
        ...user,
        friendships: [...user.friendships, friend], //spreading the current friends, and adding the new one
      });
    } else {
      //* remove the friend
      const updatedFriends = user.friendships.filter((f) => {
        return f.to_user._id !== friend.to_user._id;
      });

      setUser({
        ...user,
        friendships: updatedFriends,
      });
    }
  };

  return {
    user,
    login,
    logout,
    loading,
    signup,
    updateUser,
    updateUserFriend,
  };
};

//* Post Context

export const usePosts = () => {
  return useContext(PostContext);
};

export const useProvidePosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getPosts();
      console.log('response in useEffect of useProvidePosts', response);

      if (response.success) {
        setPosts(response.data.posts);
      }
      setLoading(false);
    };

    // call the function
    fetchData();
  }, []);

  const addPostToState = (postToBeAdded) => {
    const newPosts = [postToBeAdded, ...posts];

    setPosts(newPosts);
    /* 🛑 IMP 🛑
        After updating the state of posts =>
        Since we r using 'Provider', so all the descendants of the App Component
        will get updated accordingly!
    */
  };

  const addComment = (comment, postId) => {
    const newPosts = posts.map((post) => {
      if (post._id == postId) {
        //updating the comments array of the post
        return { ...post, comments: [...post.comments, comment] };
      }
      return post;
    });

    console.log('NEWPOSTS', newPosts);

    setPosts(newPosts);
  };

  return {
    data: posts,
    loading,
    addPostToState,
    addComment,
  };
};
