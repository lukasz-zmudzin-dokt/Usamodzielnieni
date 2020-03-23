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
    if (res.status === 200) {
      return res.status;
    } else return Promise.reject();
  });
  return res;
};
