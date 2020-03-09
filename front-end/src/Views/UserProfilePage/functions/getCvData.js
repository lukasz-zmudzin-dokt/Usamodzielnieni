import Cookies from "universal-cookie";


export const getCvData = async () => {

    const cookies = new Cookies();
    const url = "http://usamo-back.herokuapp.com/cv/data/";
    const token = await cookies.get("token");
    console.log(token);
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Authorization": "token " + token,
            "Content-Type": "application/json",
        }
    }).then(result => {
        //if (!response.ok) throw new Error(response.status);
        return result.json();
    });
    console.log(response);
}