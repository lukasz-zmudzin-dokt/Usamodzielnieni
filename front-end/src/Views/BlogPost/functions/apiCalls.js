import proxy from "config/api";

export const getPost = async (id) => {
    let url = `${proxy.blog}blogpost/${id}`;
    const headers = {
        "Content-Type": "application/json"
    };

    const response = await fetch(url, { method: "GET", headers });

    if (response.status === 200) {
        return await response.json();
    } else {
        throw response.status;
    }
};

export const deletePost = async(id, token) => {
    let url = `${proxy.blog}blogpost/${id}`;
    const headers = {
        Authorization: "Token " + token,
        "Content-Type": "application/json"
    };

    const response = await fetch(url, {method: "DELETE", headers});
    url = url + "/header";
    await fetch(url, {method: "DELETE", headers});
    if (response.status === 200) {
        return response.status;
    } else {
        throw response.status;
    }
};