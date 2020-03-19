export const sendData = async (offer, clearState, token) => {
  const url = "https://usamo-back.herokuapp.com/job/job-offer/";
  const res = fetch(url, {
    method: "POST",
    body: JSON.stringify(offer),
    headers: {
      "Content-Type": "application/json",
      Origin: null,
      Authorization: `Token ${token}`
    }
  }).then(res => {
    if (res.status === 200) {
      clearState();
    }
    return res.status;
  });
  return res;
};
