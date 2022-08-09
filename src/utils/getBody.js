export const getBody = (params) => {
  let formBody = [];

  for (let prop in params) {
    let encodedKey = encodeURIComponent(prop);
    let encodedValue = encodeURIComponent(params[prop]);

    formBody.push(encodedKey + '=' + encodedValue);
  }

  return formBody.join('&');
};
