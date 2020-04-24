export const getCVUrl = async (token, cv_id) => {
    const url = "https://usamo-back.herokuapp.com/cv/generator/" + cv_id + "/";
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Authorization": "token " + token,
            "Content-Type": "application/json"
        }
    });

    if (response.status === 200) {
        const data = await response.json().then(data => data);
        return {
            status: response.status,
            cvUrl: data
        }
    } else {
        throw response.status;
    }
};