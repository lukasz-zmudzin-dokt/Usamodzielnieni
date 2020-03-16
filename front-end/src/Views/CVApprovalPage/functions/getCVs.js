export const getCVs = async () => {

    const url = "http://usamo-back.herokuapp.com/cv/admin/list/";

    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Authorization": "token " + this.context.token,
            "Content-Type": "application/json"
        }
    }).then(result => {
        return result.json();
    });
    return response;
};