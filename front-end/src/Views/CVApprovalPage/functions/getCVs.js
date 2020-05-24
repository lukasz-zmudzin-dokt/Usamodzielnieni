import proxy from "config/api";

export const getCVs = async (token, filters) => {
  let url =
    proxy.cv +
    `admin/list/unverified/?page=${filters.page}&page_size=${filters.pageSize}`;
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
