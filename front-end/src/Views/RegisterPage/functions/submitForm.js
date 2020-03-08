import {sendData} from "./sendData";

const chooseObject = component => {
    switch(component.state.account_type) {
        case "Podopiecznym": {return({
            facility_name: component.state.name_of_place,
            facility_address: `${component.state.city} ${component.state.street} ${component.state.city_code}`
        })}
        case "Pracodawcą": {return({
            company_name: component.state.name_of_place,
            company_address: `${component.state.city} ${component.state.street} ${component.state.city_code}`,
            nip: component.state.company_nip
        })}
        case "Administratorem": {return({

        })}
    }
};

export const handleSubmit = (component, event) => {
    const {
        account_type,
        email,
        first_name,
        last_name,
        username,
        phone_number,
        password,
        passwordR
    } = component.state;
    const form = event.currentTarget;

    event.preventDefault();

    if (form.checkValidity() === false || password !== passwordR) {
        event.preventDefault();
        event.stopPropagation();
    } else if (form.checkValidity() === true && password !== passwordR) {
        component.setState({
            areEqual: false
        });
    } else {
        component.setState({
            areEqual: true
        });
        if (account_type === "Podopiecznym")
        sendData(component, {
            email,
            first_name,
            last_name,
            username,
            phone_number,
            password,
        }, chooseObject(component));
    }

    component.setState({
        validated: true
    });
};