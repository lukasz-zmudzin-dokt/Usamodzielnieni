export const getUserCVs = async (token) => {
    return await fetch("https://usamo-back.herokuapp.com/cv/user/list/", {
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
        }).then(function(res) {
            if(Array.isArray(res))
                return {
                    status: "200:OK",
                    result: res
                };
            else
                return {
                    status: res
                };
        });
};