export const getCvUrl = async (token) => {

    console.log("NOt working - API needs fixing");

    return ;

    
    const url = "http://usamo-back.herokuapp.com/cv/generate/........";
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