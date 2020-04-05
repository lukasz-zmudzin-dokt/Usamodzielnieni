const getPosts = async (token, filters) => {
  const url = "http://usamo-back.herokuapp.com/blog/blogposts/";
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

export { getPosts };
