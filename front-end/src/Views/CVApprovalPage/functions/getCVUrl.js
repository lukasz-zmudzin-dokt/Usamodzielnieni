export const getCVUrl = async (token, cv_id) => {
    const url = "http://usamo-back.herokuapp.com/cv/generator/" + cv_id + "/";
    return await fetch(url, {
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
            if(typeof res === 'string' || res instanceof String)  // jeżeli jest to string z urlem to zwróć "200:OK" i urla
                return {
                    status: "200:OK",
                    result: res
                };
            else    // jeżeli jest to obiekt z kodem błędu i opisem to zwróć "kod:opis_błędu"
                return res;
        })
};