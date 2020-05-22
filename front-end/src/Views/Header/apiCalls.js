import proxy from "config/api";

export const logoutUser = async (token) => {
    let url =
        proxy.account + "logout/";
    const headers = {
        Authorization: "token " + token,
        "Content-Type": "application/json",
    };

    const response = await fetch(url, { method: "POST", headers });
    if (response.status === 200) {
        return true;
    } else {
        throw response.status;
    }
};