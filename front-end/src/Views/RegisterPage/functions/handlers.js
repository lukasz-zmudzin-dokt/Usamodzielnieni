import {Redirect} from "react-router-dom";
import React from "react";
import HomeDataForm from "../components/homeDataForm";
import CompanyDataForm from "../components/companyDataForm";

export const onChange = (onBlur, data, e) => {
    const name = e.target.name;
    const value = e.target.value;
    onBlur({ ...data, [name]: value})
};

export const renderRedirect = (redirect) => {
    if (redirect) {
        return <Redirect to="/user" />;
    }
};

export const setRedirect = component => {
    component.setState({
        redirect: true
    });
};

export const renderSection = (component) => {
    switch(component.state.account_type) {
        case "Podopiecznym": {return (
            <HomeDataForm
                data={component.state.homeData}
                onBlur={homeData => component.setState({homeData})}
            /> )}
        case "Pracodawcą": {return (
            <CompanyDataForm
                data={component.state.companyData}
                onBlur={companyData => component.setState({companyData})}
            /> )}
        case "Administratorem": {return null;}
        default: {
            console.log("Something went wrong");
            return null;
        }
    }
};