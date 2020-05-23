import proxy from "config/api";

const getPosts = async (filters) => {
  const enTags = encodeURIComponent(filters.tag);
  const enCategories = encodeURIComponent(filters.category);
  const categoryQ = filters.category ? `&category=${enCategories}` : "";
  const tagQ = filters.tag ? `&tag=${enTags}` : "";
  const url = `${proxy.blog}blogposts/?page=${filters.page}&page_size=${filters.pageSize}${categoryQ}${tagQ}`;
  const headers = {
    "Content-Type": "application/json",
  };

  const response = await fetch(url, { method: "GET", headers });
  if (response.status === 200) {
    return response.json();
  } else {
    throw response.status;
  }
};

const getFilters = async () => {
  const urlC = proxy.blog + "categories/";
  const urlT = proxy.blog + "tags/";
  const headers = {
    "Content-Type": "application/json",
  };

  const responseC = await fetch(urlC, { method: "GET", headers });
  const responseT = await fetch(urlT, { method: "GET", headers });

  if (responseT.status === 200 && responseC.status === 200) {
    const tags = await responseT.json();
    const categories = await responseC.json();
    const filters = {
      tags,
      categories,
    };
    return filters;
  } else {
    throw new Error({ tagRes: responseT.status, catRes: responseC.status });
  }
};

export { getPosts, getFilters };
