import proxy from "config/api";

const changeUrl = async (token, id, url) => {
  const urlChange = `${proxy.plain}/changeVideo/${id}`;

  const headers = {
    Authorization: "token " + token,
    "Content-Type": "application/json",
  };
  const res = await fetch(urlChange, {
    method: "PUT",
    body: JSON.stringify({ id, url }),
    headers,
  });

  if (res.status !== 200) {
    throw Error("changeUrl");
  }
  return res.status;
};

export { changeUrl };
