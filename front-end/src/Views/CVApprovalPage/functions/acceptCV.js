export const acceptCV = async (token, cvId) => {
    return await fetch("http://usamo-back.herokuapp.com/cv/admin/verification/" + cvId + "/", {
        method: "POST",
        headers: {
            "Authorization": "token " + token,
            "Content-Type": "application/json"
        }})
        .then(function (result) {
            console.log(result);
            if(result.status === 200) {
                return {
                    detail: "OK"
                };
            } else {
                return result.json();
            }
        }).then(function (res) {
            console.log(res);
            if(res.detail === "OK") {
                return "OK";
            } else {
                console.log(res.detail);
                return res.detail;
            }
        })
};