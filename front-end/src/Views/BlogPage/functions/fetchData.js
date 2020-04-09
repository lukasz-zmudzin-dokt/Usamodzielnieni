const getPosts = async (token, filters) => {
  const enTags = encodeURIComponent(filters.tag);
  const enCategories = encodeURIComponent(filters.category);
  const categoryQ = filters.category ? `?category=${enCategories}` : "";
  const tagQ = filters.tag
    ? `${categoryQ ? `&tag=${enTags}` : `?tag=${enTags}`}`
    : "";
  const url = `http://usamo-back.herokuapp.com/blog/blogposts/${categoryQ}${tagQ}`;
  const headers = {
    Authorization: "Token " + token,
    "Content-Type": "application/json"
  };

  const response = await fetch(url, { method: "GET", headers });
  if (response.status === 200) {
    return response.json();
  } else {
    throw response.status;
  }
};

const getFilters = async token => {
  const urlC = "http://usamo-back.herokuapp.com/blog/categories/";
  const urlT = "http://usamo-back.herokuapp.com/blog/tags/";
  const headers = {
    Authorization: "Token " + token,
    "Content-Type": "application/json"
  };

  const responseC = await fetch(urlC, { method: "GET", headers });
  const responseT = await fetch(urlT, { method: "GET", headers });

  if (responseT.status === 200 && responseC.status === 200) {
    const tags = await responseT.json();
    const categories = await responseC.json();
    const filters = {
      tags,
      categories
    };
    return filters;
  } else {
    throw responseT.status;
  }
};

export { getPosts, getFilters };
