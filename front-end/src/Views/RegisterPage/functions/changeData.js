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

export { getUserData };
