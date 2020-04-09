import React from "react";
import { getCVUrl } from "./getCVUrl";

export const showCV = (token, cvId, component) => {
    getCVUrl(token, cvId).then(function (r) {
        if(r.status === "200:OK") {
            component.setState({errors: {small: false}});
            let url = "https://usamo-back.herokuapp.com" + r.result;
            window.open(url, '_blank');
        } else {
            component.setState({errors: {small: true}, errorMessages: {small: r.status}});
        }
    });
};