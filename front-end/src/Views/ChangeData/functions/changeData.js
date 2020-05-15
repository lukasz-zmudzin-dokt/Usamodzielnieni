import proxy from "config/api";

const getUserData = async (token, id) => {
  const urlUserData = `${proxy.account}admin/user_details/${id}`;
  const header = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Origin: null,
      Authorization: `Token ${token}`,
    },
  };
  const res = await fetch(urlUserData, header);
  if (res.status !== 200) {
    throw Error("getUserData");
  }
  return res.json();
};

const sendFixedData = async (token, id, data) => {
  const url = `${proxy.account}admin/change_data/${id}`;
  const header = {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Origin: null,
      Authorization: `Token ${token}`,
    },
  };
  const res = await fetch(url, header);
  if (res.status !== 200) {
    throw Error("sendFixedData");
  }
  return res.status;
};

export { getUserData, sendFixedData };
