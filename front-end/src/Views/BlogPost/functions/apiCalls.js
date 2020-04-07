export const getPost = async (id, token) => {
    let url = `https://usamo-back.herokuapp.com/blog/blogpost/${id}`;
    const headers = {
        Authorization: "Token " + token,
        "Content-Type": "application/json"
    };

    const response = await fetch(url, { method: "GET", headers });

    if (response.status === 200) {
        return response.json().then(res =>res);
    } else {
        throw response.status;
    }
};

export const deletePost = async(id, token) => {
    let url = `https://usamo-back.herokuapp.com/blog/blogpost/${id}`;

};