export const sendData = async (offer, token) => {
  const url = "https://usamo-back.herokuapp.com/job/job-offer/";
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(offer),
    headers: {
      "Content-Type": "application/json",
      Origin: null,
      Authorization: `Token ${token}`
    }
  }).then(res => {
    return res.status;
  });
  return res;
};
