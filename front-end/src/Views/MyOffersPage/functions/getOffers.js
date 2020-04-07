export const getOffers = async (token) => {
    return await fetch("http://usamo-back.herokuapp.com/job/employer/job-offers/", {
        method: "GET",
        headers: {
            "Authorization": "token " + token,
            "Content-Type": "application/json"
        }})
        .then(function(result) {
            console.log(result);
            if(result.status === 200)
                return result.json();
            else {
                return {
                    status: [result.status, result.statusText].join(":")
                };
            }
        }).then(function(res) {
            console.log(res);
            if(Array.isArray(res.results))  // jeżeli jest to tablica z wynikami to zwróć "200:OK" i tablicę z wynikami
                return {
                    status: "200:OK",
                    result: res.results
                };
            else    // jeżeli jest to obiekt z kodem błędu i opisem to zwróć "kod:opis_błędu"
                return res;
        });
};
