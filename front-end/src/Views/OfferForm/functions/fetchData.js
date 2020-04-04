const sendData = async (offer, token) => {
  console.log(offer);
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
    console.log(res);
    if (res.status === 200) {
      return res.status;
    } else return Promise.reject();
  });
  return res;
};

const getSelects = async token => {
  const urlCategories = "https://usamo-back.herokuapp.com/job/enums/categories";
  const urlTypes = "https://usamo-back.herokuapp.com/job/enums/types";

  const resCategories = await fetch(urlCategories, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Origin: null,
      Authorization: `Token ${token}`
    }
  }).then(res => {
    if (res.status === 200) {
      return res.json();
    } else return Promise.reject();
  });
  const resTypes = await fetch(urlTypes, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Origin: null,
      Authorization: `Token ${token}`
    }
  }).then(res => {
    if (res.status === 200) {
      return res.json().then(res => res);
    } else return Promise.reject();
  });

  return { categories: resCategories.categories, types: resTypes.offer_types };
};

export { sendData, getSelects };
