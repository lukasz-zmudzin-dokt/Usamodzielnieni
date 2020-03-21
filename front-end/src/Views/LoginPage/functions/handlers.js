import { Redirect } from "react-router-dom";
import React from "react";
import { sendData } from "./sendData";

//
//przesyła dane z child do parent component
//

export const onChange = (component, e) => {
    const type = e.target.type === "text" ? "username" : e.target.type;

    const value = e.target.value;
    component.setState({
        [type]: value
    });
};

export const setRedirect = component => {
    component.setState({
        redirect: true
    });
};

export const renderRedirect = (component) => {
    if (component.state.redirect) {
        return <Redirect to="/user" />;
    }
};



export const handleCheck = (component, e) => {
    component.setState({
        cookieVal: e.target.checked
    });
};

export const handleSubmit = (component, event) => {
    const form = event.currentTarget;
    const { password, username } = component.state;

    event.preventDefault();

    if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
    } else {
        // if (cookieVal) {
        //   console.log("dodaje!");
        //   setCookie();
        // }
        sendData(component);
        console.log(password, username); // login i hasło użytkownika
    }

    component.setState({
        validated: true
    });
};

