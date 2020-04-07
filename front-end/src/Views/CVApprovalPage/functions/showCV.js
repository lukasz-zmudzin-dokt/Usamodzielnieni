import React from "react";
import { getCVUrl } from "./getCVUrl";

export const showCV = (cvId, token, component) => {
    console.log(token);
    console.log(cvId);
    getCVUrl(token, cvId).then(function (r) {
        if(r.status === "200:OK") {
            component.setState({errors: {big: false}});
            let url = "http://usamo-back.herokuapp.com" + r.result;
            window.open(url, '_blank');
        } else {
            component.setState({errors: {big: true}, errorMessages: {big: r.status}});
        }
    });
};