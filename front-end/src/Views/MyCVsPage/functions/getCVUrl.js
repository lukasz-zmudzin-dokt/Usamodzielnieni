export const getCVUrl = async (token, cv_id) => {
    const response =  await fetch("https://usamo-back.herokuapp.com/cv/generator/" + cv_id + "/", {
        method: "GET",
        headers: {
            "Authorization": "token " + token,
            "Content-Type": "application/json"
        }}
    );

    if (response.status === 200) {
        return await response.json();
    } else {
        throw response.status;
    }


};