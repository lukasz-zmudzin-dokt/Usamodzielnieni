import proxy from "config/api";

const changeUrl = async (token, video) => {
  const urlChange = `${proxy.videos}video/${video.id}/`;
  const headers = {
    Authorization: "token " + token,
    "Content-Type": "application/json",
  };
  const res = await fetch(urlChange, {
    method: "PUT",
    body: JSON.stringify(video),
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
    Authorization: token ? "token " + token : undefined,
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