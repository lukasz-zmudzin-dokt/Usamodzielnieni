import {Redirect} from "react-router-dom";
import React from "react";

export const onChange = (component, e, val) => {
    const value = e.target.value;

    component.setState({
        [val]: value
    });
};

export const renderRedirect = (component) => {
    if (component.state.redirect) {
        return <Redirect to="/user" />;
    }
};

export const setRedirect = component => {
    component.setState({
        redirect: true
    });
};