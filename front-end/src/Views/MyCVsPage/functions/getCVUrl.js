export const getCVUrl = async (token, cv_id) => {
    return await fetch("https://usamo-back.herokuapp.com/cv/generator/" + cv_id + "/", {
        method: "GET",
        headers: {
            "Authorization": "token " + token,
            "Content-Type": "application/json"
        }})
        .then(function(result) {
            if(result.status === 200)
                return result.json();
            else {
                return {
                    status: [result.status, result.statusText].join(":")
                };
            }
        }).then(function (res) {
            if(typeof res === 'string' || res instanceof String)
                return {
                    status: "200:OK",
                    result: res
                };
            else
                return {
                    status: res
                };
        })
};