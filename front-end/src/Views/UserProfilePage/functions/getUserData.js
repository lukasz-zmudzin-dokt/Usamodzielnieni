import proxy from "config/api";

export const getUserData = async (token) => {
  const url = proxy.account + "data";
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: "Token " + token,
      "Content-Type": "application/json",
    },
  });

  if (response.status === 200) {
    return await response.json();
  } else {
    throw response.status;
  }
};
