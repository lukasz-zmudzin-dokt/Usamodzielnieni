export const handleBlur = (component, e, name) => {
    component.setState({
        [name]: e.target.value
    })
};

export const handleSubmit = (component) => {
    //component.setState({
    //    validated: true
    //});
    console.log(component.state);
    console.log("waiting for connection with endpoint");
};