export const getCVs = async (token) => {

    const url = "http://usamo-back.herokuapp.com/cv/admin/list/";

    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Authorization": "token " + token,
            "Content-Type": "application/json"
        }
    }).then(result => {
        return result.json();
    });
    return response;
};