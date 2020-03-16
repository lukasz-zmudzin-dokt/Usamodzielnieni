export const getOffers = async () => {

    const url = "http://usamo-back.herokuapp.com/job/employer/job-offers/";
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Authorization": "token " + this.context.token,
            "Content-Type": "application/json"
        }
    }).then(result => {
        return result.json();
    });
    console.log(response);
    return response;
};