import proxy from "config/api";

export const getCVUrl = async (token, cv_id) => {
    const url = proxy.cv + "generator/" + cv_id + "/";
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Authorization": "token " + token,
            "Content-Type": "application/json"
        }
    });

    if (response.status === 200) {
        return await response.json().then(data => data);
    } else {
        throw response.status;
    }
};