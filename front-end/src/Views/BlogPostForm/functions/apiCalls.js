import proxy from "config/api";

export const getPost = async (id, token) => {
  let url = `${proxy.blog}blogpost/${id}`;
  const headers = {
    Authorization: "Token " + token,
    "Content-Type": "application/json",
  };

  const response = await fetch(url, { method: "GET", headers });

  if (response.status === 200) {
    return response.json().then((res) => res);
  } else {
    throw response.status;
  }
};

export const getFilters = async (token) => {
  const urlC = proxy.blog + "categories/";
  const urlT = proxy.blog + "tags/";
  const headers = {
    Authorization: "Token " + token,
    "Content-Type": "application/json",
  };

  const responseC = await fetch(urlC, { method: "GET", headers });
  const responseT = await fetch(urlT, { method: "GET", headers });

  if (responseT.status === 200 && responseC.status === 200) {
    const tags = await responseT.json().then((res) => res);
    const categories = await responseC.json().then((res) => res);
    const filters = {
      tags,
      categories,
    };
    return filters;
  } else {
    throw responseT.status;
  }
};

export const postBlogPost = async (data, token, method, id) => {
  let url = proxy.blog + "blogpost/";
  if (method === "PUT") {
    url = `${url}${id}/`;
  } else {
    data = { ...data, id: id };
  }
  const headers = {
    Authorization: "Token " + token,
    "Content-Type": "application/json",
  };

  const response = await fetch(url, {
    method: method,
    headers,
    body: JSON.stringify(data),
  });
  let status = method === "PUT" ? 200 : 201;
  if (response.status === status) {
    return true;
  } else throw response.status;
};

export const uploadPhoto = async (id, photo, token, mode) => {
  const formData = new FormData();
  formData.append("file", photo, photo.name);
  const url =
    mode === "header"
      ? `${proxy.blog}blogpost/${id}/header/`
      : `${proxy.blog}blogpost/${id}/attachment-upload/`;
  const headers = {
    Authorization: "Token " + token,
  };

  const response = await fetch(url, {
    method: "POST",
    headers,
    body: formData,
  });

  if (response.status === 200) {
    return await response.json();
  } else throw response.status;
};

export const reserveSpace = async (token) => {
  const url = proxy.blog + "blogpost/reservation/";
  const headers = {
    Authorization: "Token " + token,
    "Content-Type": "application/json",
  };
  const res = await fetch(url, { method: "POST", headers });
  if (res.status === 201) {
    return await res.json();
  } else {
    throw res.status;
  }
};
