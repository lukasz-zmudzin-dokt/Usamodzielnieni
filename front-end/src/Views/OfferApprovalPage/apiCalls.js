import proxy from "config/api";

export const getOffers = async (token) => {
    let url = proxy.job + "admin/job-offers/unconfirmed/";
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

export const setOfferApproved = async (token, offerId) => {
    let url = proxy.job + "admin/confirm/" + offerId + "/";
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

export const setOfferRejected = async (token, offerId) => {
    let url = proxy.job + "admin/reject/" + offerId + "/";
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