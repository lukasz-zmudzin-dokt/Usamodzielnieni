export const getFilters = async token => {
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

export const postBlogPost = (data, token) => {

};

export const uploadPhoto = (photo, token) => {

};