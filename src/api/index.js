import { API_URLS, LOCAL_STORAGE_TOKEN_KEY } from '../utils';
import { getBody } from '../utils/getBody';

// function that'll fetch the req.data:
const customFetch = async (url, { body, ...customConfig }) => {
  const token = window.localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);

  const headers = {
    'content-type': 'application/x-www-form-urlencoded',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const config = {
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body) {
    config.body = getBody(body);
  }
  console.log('config:', config);

  try {
    const response = await fetch(url, config);
    console.log('response in main fetch:', response);
    const data = await response.json();

    if (data.success) {
      return {
        data: data.data,
        success: true,
      };
    }

    throw new Error(data.message); //else throw the error => will go in catch
  } catch (error) {
    console.log('error:', error.message);
    return {
      message: error.message,
      success: false,
    };
  }
};

export const getPosts = async (page = 1, limit = 5) => {
  console.log('getposts');
  const res = await customFetch(API_URLS.posts(page, limit), {
    method: 'GET',
  });

  console.log('response inside api/getPosts', res);

  return res;
};

export const login = async (email, password) => {
  console.log('login');

  const res = await customFetch(API_URLS.login(), {
    method: 'POST',
    body: { email, password },
  });

  return res;
};

export const signUp = async (name, email, password, confirmPassword) => {
  console.log('signup');

  const res = await customFetch(API_URLS.signup(), {
    method: 'POST',
    body: { name, email, password, confirm_password: confirmPassword },
  });

  return res;
};

export const editProfile = async (userId, name, password, confirmPassword) => {
  console.log('editprofile');

  const res = await customFetch(API_URLS.editUser(), {
    method: 'POST',
    body: { id: userId, name, password, confirm_password: confirmPassword },
  });

  return res;
};

export const fetchUserProfile = async (userId) => {
  console.log('fetchuserprofile');
  const res = await customFetch(API_URLS.userInfo(userId), {
    method: 'GET',
  });

  return res;
};

export const fetchUserFriends = async () => {
  console.log('fetchfriends');
  const res = await customFetch(API_URLS.friends(), {
    method: 'GET',
  });

  return res;
};

export const addFriend = async (userId) => {
  console.log('Add-Friend');
  const res = await customFetch(API_URLS.createFriendship(userId), {
    method: 'POST',
  });

  return res;
};

export const removeFriend = async (userId) => {
  console.log('Remove-Friend');
  const res = await customFetch(API_URLS.removeFriend(userId), {
    method: 'POST',
  });

  return res;
};

export const createPost = async (content) => {
  const res = await customFetch(API_URLS.createPost(), {
    method: 'POST',
    body: {
      content,
    },
  });

  return res;
};

export const createComment = async (content, postId) => {
  const res = await customFetch(API_URLS.comment(), {
    method: 'POST',
    body: {
      post_id: postId,
      content,
    },
  });

  return res;
};

export const toggleLike = async (itemId, itemType) => {
  const res = await customFetch(API_URLS.toggleLike(itemId, itemType), {
    method: 'POST',
  });

  return res;
};
