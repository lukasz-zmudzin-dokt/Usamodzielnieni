import Cookies from "universal-cookie";

export const getInterestedPeople = async (e, offer_id) => {

    e.preventDefault();

    const cookies = new Cookies();
    const url = "http://usamo-back.herokuapp.com/job/employer/offer-interested/" + offer_id;
    const token = await cookies.get("token");
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Authorization": "token " + token,
            "Content-Type": "application/json"
        }
    }).then(result => {
        return result.json();
    });
    console.log("tu będzie pobieranie osób zainteresowanych ofertą o id " + offer_id);
    console.log(response);
    return response;
};