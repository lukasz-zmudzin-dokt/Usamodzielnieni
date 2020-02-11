export const handleSubmit = (component, event) => {
    const {
        email,
        first_name,
        last_name,
        username,
        phone_number,
        city,
        city_code,
        street,
        name_of_place,
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
        const facility_name = name_of_place;
        const facility_address = `${city} ${street} ${city_code}`;
        component.sendData({
            email,
            first_name,
            last_name,
            username,
            phone_number,
            password,
            facility_name,
            facility_address
        });
    }

    component.setState({
        validated: true
    });
};