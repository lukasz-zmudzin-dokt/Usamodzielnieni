export const getMyOffers = async (token) => {
    let url = "http://usamo-back.herokuapp.com/job/employer/job-offers/";
    const headers = {
        "Authorization": "token " + token,
        "Content-Type": "application/json"
    };

    const response = await fetch(url, { method: "GET", headers });
    console.log(response);
    if(response.status === 200) {
        return await response.json();
    } else {
        throw response.status;
    }
};

export const getOfferPeople = async (token, offerId) => {
    let url = "http://usamo-back.herokuapp.com/job/employer/application_list/" + offerId + "/";
    const headers = {
        "Authorization": "token " + token,
        "Content-Type": "application/json"
    };

    const response = await fetch(url, { method: "GET", headers });
    console.log(response);
    if(response.status === 200) {
        return await response.json();
    } else {
        throw response.status;
    }
};