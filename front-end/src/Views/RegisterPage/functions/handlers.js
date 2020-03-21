import {Redirect} from "react-router-dom";
import React from "react";
import HomeDataForm from "../components/homeDataForm";
import CompanyDataForm from "../components/companyDataForm";

export const onChange = (component, e) => {
    const name = e.target.name;
    const value = e.target.value;
    component.props.onBlur({ ...component.props.data, [name]: value})
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
    }
};