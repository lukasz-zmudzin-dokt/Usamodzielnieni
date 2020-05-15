import proxy from "config/api";

export const deleteOffer = async (id, token) => {
  let url = `${proxy.job}job-offer/${id}/`;
  const headers = {
    Authorization: "Token " + token,
    "Content-Type": "application/json",
  };

  const response = await fetch(url, { method: "DELETE", headers });
  if (response.status === 200) {
    return response.status;
  } else {
    throw Error(response.status.toString());
  }
};
