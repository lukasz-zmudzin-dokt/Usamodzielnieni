
export const getCvUrl = () => {

    console.log("WYWOŁAŁO SIE");
    const cookies = new Cookies();
    const url = "http://usamo-back.herokuapp.com/cv/generate/";
    const token = cookies.get("token");
    console.log(token);
    const response = fetch(url, {
        method: 'GET',
        headers: {
            "Authorization": "token " + token,
            "Content-Type": "application/json"
        }
    })//.then(response => {
    //if (!response.ok) throw new Error(response.status);
    // return response;
    //   });
    console.log(response);
};