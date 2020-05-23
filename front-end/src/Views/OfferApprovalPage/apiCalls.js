import proxy from "config/api";

export const getOffers = async (token, filters) => {
  let url =
    proxy.job +
    `admin/job-offers/unconfirmed/?page=${filters.page}&page_size=${filters.pageSize}`;
  const headers = {
    Authorization: "token " + token,
    "Content-Type": "application/json",
  };

  const response = await fetch(url, { method: "GET", headers });
  if (response.status === 200) {
    return await response.json();
  } else {
    throw response.status;
  }
};

export const setOfferApproved = async (token, offerId) => {
  let url = proxy.job + "admin/confirm/" + offerId + "/";
  const headers = {
    Authorization: "token " + token,
    "Content-Type": "application/json",
  };
  const data = {
    confirmed: true,
  };

  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });
  if (response.status === 200) {
    return response.status;
  } else {
    throw response.status;
  }
};

export const setOfferRejected = async (token, offerId) => {
  let url = proxy.job + "job-offer/" + offerId + "/";
  const headers = {
    Authorization: "token " + token,
    "Content-Type": "application/json",
  };
  const response = await fetch(url, { method: "DELETE", headers });
  if (response.status === 200) {
    return response.status;
  } else {
    throw response.status;
  }
};
