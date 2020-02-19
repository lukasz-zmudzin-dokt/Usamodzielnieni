import { Redirect } from "react-router-dom";
import React from "react";

export const sendBackData = (component) => {
    component.props.parentCallback(component.state.username, component.state.password);
};

export const onChange = (component, e) => {
    const type = e.target.type === "text" ? "username" : e.target.type;

    const value = e.target.value;
    component.setState({
        [type]: value
    });
    console.log("onChange", component, e, type, value);
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

export const handleSubmit = (Component, event) => {
    const form = event.currentTarget;
    const { password, username } = Component.state;
   

    console.log("handleSubmit -> password, username", password, username);
    
    event.preventDefault();

    if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
    } else {
        // if (cookieVal) {
        //   console.log("dodaje!");
        //   setCookie();
        // }
        Component.sendData(Component);
        console.log(password, username); // login i hasło użytkownika
    }

    Component.setState({
        validated: true
    });
};


export const setCookie = (token, component) => {
    const current = new Date();
    const nextYear = new Date();

    nextYear.setFullYear(current.getFullYear() + 1); // ciasteczko na rok
    console.log(token);
    component.cookies.set(`token`, token, {
        path: "/",
        expires: nextYear
    });
};

