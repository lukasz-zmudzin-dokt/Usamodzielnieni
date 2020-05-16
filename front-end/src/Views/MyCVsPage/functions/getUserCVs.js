import proxy from "config/api";

export const getUserCVs = async (token) => {
  const res = await fetch(proxy.cv + "user/list/", {
    method: "GET",
    headers: {
      Authorization: "token " + token,
      "Content-Type": "application/json",
    },
  })

  if (res.status === 200) {
    return await res.json();
  } else {
    throw res.status;
  }
};
