export const getJson = url => {
  const headers = new Headers();
  headers.set("Content-Type", "application/json;charset=utf-8");
  headers.set("Accept", "application/json;charset=utf-8");
  return fetch(url, {
    method: "GET",
    headers: headers
  })
    .then(response => response.json())
    .catch(e => {
      throw e;
    });
};

export const postJson = (url, json) => {
  const headers = new Headers();
  headers.set("Content-Type", "application/json;charset=utf-8");
  headers.set("Accept", "application/json;charset=utf-8");
  let config = {
    method: "POST",
    headers,
    body: JSON.stringify(json)
  };
  return fetch(url, config)
    .then(response => response.json())
    .catch(e => {
      throw e;
    });
};
