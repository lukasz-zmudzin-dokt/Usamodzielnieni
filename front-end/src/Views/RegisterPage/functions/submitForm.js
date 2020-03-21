import {sendData} from "./sendData";

const adjustObject = component => {
    let source;
    switch(component.state.account_type) {
        case "Podopiecznym": {
            source = component.state.homeData;
            return({
            facility_name: source.name_of_place,
            facility_address: `${source.city} ${source.street} ${source.city_code}`
        })}
        case "Pracodawcą": {
            source = component.state.companyData;
            return({
            company_name: source.name_of_place,
            company_address: `${source.city} ${source.street} ${source.city_code}`,
            nip: source.company_nip
        })}
        case "Administratorem": {return({

        })}
    }
};

export const handleSubmit = (component, event) => {
    const data = {
        ...component.state.personalData,
        ...component.state.accountData,
        ...adjustObject(component)
    };

    const form = event.currentTarget;

    event.preventDefault();
    const {password, passwordR} = component.state.accountData;
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
        sendData( component, data );
    }

    component.setState({
        validated: true
    });
};