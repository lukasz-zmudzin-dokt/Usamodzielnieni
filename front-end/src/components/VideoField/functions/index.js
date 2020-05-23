import proxy from "config/api";

const changeUrl = async (token, url) => {
  const urlChange = `${proxy.videos}/new-video`;
  const headers = {
    Authorization: "token " + token,
    "Content-Type": "application/json",
  };
  const res = await fetch(urlChange, {
    method: "POST",
    body: JSON.stringify({ url }),
    headers,
  });

  if (res.status !== 200) {
    throw Error("changeUrl");
  }
  return res.status;
};

const getUrl = async (token, id) => {
  const urlChange = `${proxy.videos}video/${id}`;
  const headers = {
    Authorization: "token " + token,
    "Content-Type": "application/json",
  };
  const res = await fetch(urlChange, {
    method: "GET",
    headers,
  });

  if (res.status !== 200) {
    throw Error("changeUrl");
  }
  return await res.json();
};

export { changeUrl, getUrl };
