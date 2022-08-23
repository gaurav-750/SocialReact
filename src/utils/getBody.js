//
export const setItemInLocalStorage = (key, value) => {
  if (!key || !value) {
    console.error('Cannot store in LocalStorage!');
    return;
  }

  const valueToStore =
    typeof value !== 'string' ? JSON.stringify(value) : value;

  //setting in localstorage:
  localStorage.setItem(key, valueToStore);
};

export const getItemFromLocalStorage = (key) => {
  if (!key) {
    return console.error('Cannot get the value from LocalStorage!');
  }

  //getting from localstorage:
  return localStorage.getItem(key);
};

export const removeItemFromLocalStorage = (key) => {
  if (!key) {
    console.error('Cannot remove the value from LocalStorage!');
    return;
  }

  //removing from localstorage:
  localStorage.removeItem(key);
};

export const getBody = (params) => {
  let formBody = [];

  for (let prop in params) {
    let encodedKey = encodeURIComponent(prop);
    let encodedValue = encodeURIComponent(params[prop]);

    formBody.push(encodedKey + '=' + encodedValue);
  }

  return formBody.join('&');
};
