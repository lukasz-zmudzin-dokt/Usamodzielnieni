export const getCvData = async (token) => {

    const url = "https://usamo-back.herokuapp.com/cv/data/";
    console.log(token);
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Authorization": "token " + token,
            "Content-Type": "application/json",
        }
    }).then(response => {
        if(response.status === 200) {
            return response.json();
        } else if(response.status === 404) {
            console.log("404 - CV NOT FOUND")
            return ;
        } else {
            return response.status;
        }
    });
    console.log(response);
};