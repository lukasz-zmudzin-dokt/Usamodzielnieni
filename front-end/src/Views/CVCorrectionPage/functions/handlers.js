export const handleBlur = (component, e, name) => {
    component.setState({
        [name]: e.target.value
    });
};