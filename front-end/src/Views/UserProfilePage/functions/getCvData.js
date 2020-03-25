export const getCvData = async (token) => {

    const url = "http://usamo-back.herokuapp.com/cv/data/";
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
};