import Cookies from "universal-cookie";

export const getOffers = async () => {

    const cookies = new Cookies();
    const url = "http://usamo-back.herokuapp.com/job/employer/job-offers/";
    const token = await cookies.get("token");
    console.log(token);
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Authorization": "token " + token,
            "Content-Type": "application/json"
        }
    }).then(result => {
        return result.json();
    });
    console.log(response);
    return response;
};