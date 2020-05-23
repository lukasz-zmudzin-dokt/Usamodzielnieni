import proxy from "config/api";

export const getCVUrl = async (token, cv_id) => {
  const url = proxy.cv + "generator/" + cv_id + "/";
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: "token " + token,
      "Content-Type": "application/json",
    },
  });
  console.log(response);
  if (response.status === 200) {
    console.log(await response.json());
    return await response.json();
  } else {
    throw response.status;
  }
};
