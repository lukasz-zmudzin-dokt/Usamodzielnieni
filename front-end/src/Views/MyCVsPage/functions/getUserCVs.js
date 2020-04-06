import React from "react";

export const getUserCVs = async (token) => {
    return await fetch("http://usamo-back.herokuapp.com/cv/user/list/", {
        method: "GET",
        headers: {
            "Authorization": "token " + token,
            "Content-Type": "application/json"
        }})
        .then(function(result) {
            console.log(token);
            if(result.status === 200)
                return result.json();
            else {
                return {
                    status: [result.status, result.statusText].join(":")
                };
            }
        }).then(function(res) {
            if(Array.isArray(res))  // jeżeli jest to tablica z wynikami to zwróć "200:OK" i tablicę z wynikami
                return {
                    status: "200:OK",
                    result: res
                };
            else    // jeżeli jest to obiekt z kodem błędu i opisem to zwróć "kod:opis_błędu"
                return {
                    status: res
                };
        });
};