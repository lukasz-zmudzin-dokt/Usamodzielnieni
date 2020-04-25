export const getUsersToApprove = async (token) => {
    let url = "https://usamo-back.herokuapp.com/account/admin/user_list/all/?status=2";
    const headers = {
        "Authorization": "token " + token,
        "Content-Type": "application/json"
    };

    const response = await fetch(url, { method: "GET", headers });
    if(response.status === 200) {
        return await response.json();
    } else {
        throw response.status;
    }
};

export const getUserDetails = async (token, userId) => {
    let url = "https://usamo-back.herokuapp.com/account/admin/user_details/" + userId + "/";
    const headers = {
        "Authorization": "token " + token,
        "Content-Type": "application/json"
    };

    const response = await fetch(url, { method: "GET", headers });
    if(response.status === 200) {
        return await response.json();
    } else {
        throw response.status;
    }
};

export const setUserApproved = async (token, userId) => {
    let url = "https://usamo-back.herokuapp.com/account/admin/user_admission/" + userId + "/";
    const headers = {
        "Authorization": "token " + token,
        "Content-Type": "application/json"
    };

    const response = await fetch(url, { method: "POST", headers });
    if(response.status === 200) {
        return await response.json();
    } else {
        throw response.status;
    }
};

export const setUserRejected = async (token, userId) => {
    let url = "https://usamo-back.herokuapp.com/account/admin/user_rejection/" + userId + "/";
    const headers = {
        "Authorization": "token " + token,
        "Content-Type": "application/json"
    };

    const response = await fetch(url, { method: "POST", headers });
    if(response.status === 200) {
        return await response.json();
    } else {
        throw response.status;
    }
};