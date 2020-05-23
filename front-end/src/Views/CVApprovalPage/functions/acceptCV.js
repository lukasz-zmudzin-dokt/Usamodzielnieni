import proxy from "config/api";

export const acceptCV = async (token, cvId) => {
  let url = proxy.cv + "admin/verification/" + cvId + "/";
  const headers = {
    Authorization: "token " + token,
    "Content-Type": "application/json",
  };

  const response = await fetch(url, { method: "POST", headers });
  if (response.status === 200) {
    console.log(await response.json());
    return await response.json();
  } else {
    throw response.status;
  }
};
