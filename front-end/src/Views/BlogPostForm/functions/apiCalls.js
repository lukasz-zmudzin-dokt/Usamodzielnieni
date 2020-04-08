export const getPost = async (id, token) => {
    let url = `https://usamo-back.herokuapp.com/blog/blogpost/${id}`;
    const headers = {
        Authorization: "Token " + token,
        "Content-Type": "application/json"
    };

    const response = await fetch(url, { method: "GET", headers });

    if (response.status === 200) {
        return response.json().then(res =>res );
    } else {
        throw response.status;
    }
};

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

export const postBlogPost = async (data, token, method, id) => {
    let url = "http://usamo-back.herokuapp.com/blog/blogpost/";
    if (id !== -1)
        url = `${url}${id}`;
    const headers = {
        Authorization: "Token " + token,
        "Content-Type": "application/json"
    };

    const response = await fetch(url, {
        method: method,
        headers,
        body: JSON.stringify(data)
    });

    if (response.status === 200) {
        return await response.json().then(res => res);
    } else
        throw response.status;
};

export const uploadPhoto = async (id, photo, token) => {
    const formData = new FormData();
    formData.append('file', photo, photo.name);
    console.log(formData);
    const url = `http://usamo-back.herokuapp.com/blog/blogpost/${id}/header`;
    const headers = {
        Authorization: "Token " + token
    };

    const response = await fetch(url, {
        method: "POST",
        headers,
        body: formData
    });

    if (response.status === 200) {
        return response.status;
    } else
        throw response.status;
};