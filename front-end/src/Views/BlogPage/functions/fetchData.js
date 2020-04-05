const getPosts = async (token, filters) => {
  const categoriesQ =
    filters.categories.length > 0 ? `?category=${filters.categories[0]}` : "";
  const tagsQ = filters.tags.length > 0 ? `&tag=${filters.tags[0]}` : "";
  const url = `http://usamo-back.herokuapp.com/blog/blogposts/${categoriesQ}${tagsQ}`;
  console.log(url);
  const headers = {
    Authorization: "Token " + token,
    "Content-Type": "application/json"
  };

  const response = await fetch(url, { method: "GET", headers });
  if (response.status === 200) {
    return response.json().then(res =>
      res.map(({ category, tags, content, date_created, author }) => ({
        category,
        tags,
        content,
        dateCreated: date_created,
        author
      }))
    );
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
