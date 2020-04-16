import { getCVUrl } from "./getCVUrl";

export const showCV = (token, cvId) => {
    return getCVUrl(token, cvId).then(function (response) {
        if(response.status === "200:OK") {
            let url = "https://usamo-back.herokuapp.com" + response.result;
            window.open(url, '_blank');
        }
        return response.status;
    })
};