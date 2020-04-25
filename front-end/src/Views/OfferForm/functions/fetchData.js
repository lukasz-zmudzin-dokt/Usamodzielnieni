const sendData = async (offer, token, id) => {
  console.log("jestem tutaj? ");
  const url = `https://usamo-back.herokuapp.com/job/job-offer/${
    id ? `${id}/` : ""
  }`;
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(offer),
    headers: {
      "Content-Type": "application/json",
      Origin: null,
      Authorization: `Token ${token}`,
    },
  })
  if (res.status !== 200) {
    throw Error('getSelects');
  }
  return res.status;
};

const getCategories = async (token) => {
  const urlCategories = "https://usamo-back.herokuapp.com/job/enums/categories";
  const res = await fetch(urlCategories, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Origin: null,
      Authorization: `Token ${token}`,
    },
  })
  if (res.status !== 200) {
    throw Error('getCategories');
  }
  return res.json().then(res => res.categories);
}

const getTypes = async (token) => {
  const urlTypes = "https://usamo-back.herokuapp.com/job/enums/types";

  const res = await fetch(urlTypes, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Origin: null,
      Authorization: `Token ${token}`,
    },
  })
  if (res.status !== 200) {
    throw Error('getTypes');
  }
  return res.json().then(res => res.offer_types);
};

const getSelects = async (token) => {
  const categories = await getCategories(token);
  const types = await getTypes(token);
  return { categories, types };
}

const getOffer = async (token, id) => {
  const url = `https://usamo-back.herokuapp.com/job/job-offer/${id}/`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Origin: null,
      Authorization: `Token ${token}`,
    },
  })
  if (res.status !== 200) {
    throw Error('getOffer');
  }
  return res.json();
};

export { sendData, getSelects, getOffer };
