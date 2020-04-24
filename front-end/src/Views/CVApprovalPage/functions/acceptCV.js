export const acceptCV = async (token, cvId) => {
    let url = "https://usamo-back.herokuapp.com/cv/admin/verification/" + cvId + "/";
    const headers = {
        "Authorization": "token " + token,
        "Content-Type": "application/json"
    };

    const response = await fetch(url, {method: "POST", headers});
    if(response.status === 200) {
        return await response.json();
    } else {
        throw response.status;
    }
};