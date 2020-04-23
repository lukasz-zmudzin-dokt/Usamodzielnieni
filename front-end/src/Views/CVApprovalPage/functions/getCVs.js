export const getCVs = async (token) => {

    let url = "http://usamo-back.herokuapp.com/cv/admin/list/unverified/";
    const headers = {
        "Authorization": "token " + token,
        "Content-Type": "application/json"
    };

    const response = await fetch(url, {method: "GET", headers});
    if (response.status === 200) {
        return await response.json();
    } else {
        throw response.status;
    }
};