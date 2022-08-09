import { API_URLS, LOCAL_STORAGE_TOKEN_KEY } from '../utils';
import { getBody } from '../utils/getBody';

// function that'll fetch the req.data:
const customFetch = async (url, { body, ...customConfig }) => {
  const token = window.localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);

  const headers = {
    'content-type': 'application/x-www-form-url-encoded',
    Accept: 'application/json',
    // 'Access-Control-Allow-Origin': '*',
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
  // console.log('config:', config);

  try {
    const response = await fetch(url, config);
    // console.log('response', response);
    const data = await response.json();

    if (data.success) {
      return {
        data: data.data,
        success: true,
      };
    }

    // await fetch(url, config)
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((data) => {
    //     if (data.success) {
    //       console.log('data:', data);
    //       return {
    //         data: data.data,
    //         success: true,
    //       };
    //     }
    // })

    throw new Error(data.message); //else throw the error => will go in catch
  } catch (error) {
    return {
      message: error.message,
      success: false,
    };
  }
};

export const getPosts = async (page = 1, limit = 5) => {
  const res = await customFetch(API_URLS.posts(page, limit), {
    method: 'GET',
  });

  return res;
};

export const login = async (email, password) => {
  const res = await customFetch(API_URLS.login(), {
    method: 'POST',
    body: { email, password },
  });

  return res;
};
