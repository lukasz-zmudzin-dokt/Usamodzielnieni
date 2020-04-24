export const getCvData = async (token) => {

    const url = "https://usamo-back.herokuapp.com/cv/data/";
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Authorization": "token " + token,
            "Content-Type": "application/json",
        }
    }).then(response => {
        if (response.status === 200) {
            return response.json();
        } else {
            return response.status;
        }
    });
};