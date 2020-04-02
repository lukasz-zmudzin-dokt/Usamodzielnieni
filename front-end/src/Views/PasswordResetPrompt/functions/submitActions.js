import React from "react";

export const handleConnection = async (email, e) => {
    const url = "http://usamo-back.herokuapp.com/account/password_reset/";
    const object = {email: email};
    return await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(object)
    }).then(response => {
        return response.status === 201 || response.status === 200;
    });
};