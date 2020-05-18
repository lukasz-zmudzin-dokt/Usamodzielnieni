import proxy from "config/api";

const sendData = async (offer, token, id) => {
  const url = `${proxy.job}job-offer/${id ? `${id}/` : ""}`;
  const res = await fetch(url, {
    method: id ? "PUT" : "POST",
    body: JSON.stringify(offer),
    headers: {
      "Content-Type": "application/json",
      Origin: null,
      Authorization: `Token ${token}`,
    },
  });
  if (res.status !== 200) {
    throw Error("getSelects");
  }
  return res.status;
};

const getCategories = async () => {
  const urlCategories = proxy.job + "enums/categories";
  const res = await fetch(urlCategories, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Origin: null,
    },
  });
  if (res.status !== 200) {
    throw Error("getCategories");
  }
  return res.json().then((res) => res.categories);
};

const getTypes = async () => {
  const urlTypes = proxy.job + "enums/types";

  const res = await fetch(urlTypes, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Origin: null,
    },
  });
  if (res.status !== 200) {
    throw Error("getTypes");
  }
  return res.json().then((res) => res.offer_types);
};

const getSelects = async () => {
  const [categories, types] = await Promise.all([
    getCategories(),
    getTypes(),
  ]);
  return { categories, types };
};

const getOffer = async (id) => {
  const url = `${proxy.job}job-offer/${id}/`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Origin: null,
    },
  });
  if (res.status !== 200) {
    throw Error("getOffer");
  }
  return res.json().then((res) => ({
    ...res,
    expiration_date: new Date(res.expiration_date),
  }));
};

export { sendData, getSelects, getCategories, getTypes, getOffer };
