export const handleSubmit = (data, event) => {
    const form = event.currentTarget;
    event.preventDefault();
    const {password, passwordR} = data.accountData || {};

    if (form.checkValidity() === false || password !== passwordR) {
        event.stopPropagation();
        return false;
    } else return !(form.checkValidity() === true && password !== passwordR);
};