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
    console.log('error:', error.message);
    return {
      message: error.message,
      success: false,
    };
  }
};

// const customFetch = async (url, { body, ...customConfig }) => {
//   const token = window.localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);

//   const headers = {
//     'content-type': 'application/x-www-form-urlencoded',
//     'Access-Control-Allow-Origin': '*',
//   };

//   if (token) {
//     headers.Authorization = `Bearer ${token}`;
//   }

//   const config = {
//     ...customConfig,
//     headers: {
//       ...headers,
//       ...customConfig.headers,
//     },
//   };

//   console.log('c', config);

//   if (body) {
//     config.body = getBody(body);
//   }

//   try {
//     console.log('url', url);
//     const response = await fetch(url, config);
//     console.log('MAIN res:', response);
//     const data = await response.json();
//     console.log('data:', data);

//     if (data.success) {
//       return {
//         data: data.data,
//         success: true,
//       };
//     }

//     throw new Error(data.message);
//   } catch (error) {
//     console.error('error');
//     return {
//       message: error.message,
//       success: false,
//     };
//   }
// };

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

export const signUp = async (name, email, password, confirmPassword) => {
  const res = await customFetch(API_URLS.signup(), {
    method: 'POST',
    body: { name, email, password, confirm_password: confirmPassword },
  });

  console.log('response in signup api:', res);
  return res;
};
