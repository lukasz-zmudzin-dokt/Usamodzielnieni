import Cookies from "universal-cookie";

export const getCVs = async () => {

    const cookies = new Cookies();
    const url = "http://usamo-back.herokuapp.com/cv/admin/list/";
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
    return response;
};