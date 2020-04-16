export const getInterestedPeople = async (token, offerId) => {
    return await fetch("/job/employer/application_list/" + offerId + "/", {
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
            if(Array.isArray(res))  // jeżeli jest to tablica z wynikami to zwróć "200:OK" i tablicę z wynikami
                return ({
                    status: "200:OK",
                    result: res
                });
            else    // jeżeli jest to obiekt z kodem błędu i opisem to zwróć "kod:opis_błędu"
                return res;
        });
};
