const getPosts = async (token, filters) => {
  const categoryQ = filters.category ? `?category=${filters.category}` : "";
  const tagQ = filters.tag
    ? `${categoryQ ? `&tag=${filters.tag}` : `?tag=${filters.tag}`}`
    : "";
  const url = `http://usamo-back.herokuapp.com/blog/blogposts/${categoryQ}${tagQ}`;
  const headers = {
    Authorization: "Token " + token,
    "Content-Type": "application/json"
  };

  const response = await fetch(url, { method: "GET", headers });
  if (response.status === 200) {
    return response.json().then(res => {
      console.log(res);
      return res.map(({ id, category, tags, summary, date_created, author }) => ({
        id,
        category,
        tags,
        summary,
        dateCreated: date_created,
        author
      }));
    });
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
    const tags = await responseT.json().then(res => res);
    const categories = await responseC.json().then(res => res);
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
