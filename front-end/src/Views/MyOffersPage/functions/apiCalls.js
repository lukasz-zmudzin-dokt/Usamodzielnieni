import proxy from "config/api";

export const getMyOffers = async (token) => {
  let url = proxy.job + "employer/job-offers/";
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

export const getOfferPeople = async (token, offerId, filters) => {
  let url =
    proxy.job +
    "employer/application_list/" +
    offerId +
    `/?page=${filters.page}&page_size=${filters.pageSize}`;
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
