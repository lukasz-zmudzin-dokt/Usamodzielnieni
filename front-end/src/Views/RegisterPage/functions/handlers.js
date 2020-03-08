import {Redirect} from "react-router-dom";
import React from "react";
import HomeDataForm from "../components/homeDataForm";
import CompanyDataForm from "../components/companyDataForm";

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

export const renderSection = (component) => {
    switch(component.state.account_type) {
        case "Podopiecznym": {return <HomeDataForm component={component} />}
        case "Pracodawcą": {return <CompanyDataForm component={component} /> }
        case "Administratorem": {return null;}
    }
}