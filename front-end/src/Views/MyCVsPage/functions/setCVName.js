import proxy from "config/api";

export const setCVName = async (token, cvId, cvName) => {
    let url = proxy.cv + "name/" + cvId + "/";
    const headers = {
        "Authorization": "token " + token,
        "Content-Type": "application/json"
    };
    const data = {
        name: cvName
    };

    const response = await fetch(url, { method: "PUT", headers, data });
    console.log(response);
    if(response.status === 200) {
        return await response.json();
    } else {
        throw response.status;
    }
};