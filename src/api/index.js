import { API_URLS, LOCAL_STORAGE_TOKEN_KEY } from '../utils';

// function that'll fetch the req.data:
const customFetch = async (url, { body, ...customConfig }) => {
  const token = window.localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);

  const headers = {
    'content-type': 'application/json',
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
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
    config.body = JSON.stringify(body);
  }
  console.log('config:', config);

  try {
    await fetch(url, config)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          console.log('data:', data.data);
          return {
            data: data.data,
            success: true,
          };
        }

        throw new Error(data.message); //else throw the error => will go in catch
      });
  } catch (error) {
    // console.log('Error', error);
    return {
      message: error.message,
      success: false,
    };
  }
};

export const getPosts = (page = 1, limit = 5) => {
  return customFetch(API_URLS.posts(page, limit), {
    method: 'GET',
  });
};

// export default { getPosts };
