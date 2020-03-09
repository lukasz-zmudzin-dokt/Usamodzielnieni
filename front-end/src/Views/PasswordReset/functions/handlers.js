export const handleBlur = (component, e, name) => {
    component.setState({
        [name]: e.target.value
    })
};

export const handleSubmit = (component, e) => {
    e.preventDefault();
    //component.setState({
    //    validated: true
    //});
    console.log(component.state);
    console.log("waiting for connection with endpoint");
};

export const validatePassword = component => {
  let { new_password, new_passwordR } = component.state;
  if (new_password !== new_passwordR)
      return "Hasła się nie zgadzają!";
  else if (new_password.length < 6)
      return "Hasło jest za krótkie!";
  else {
      component.setState({
          validated: true
      });
  }
};

export const handlePasswordChange = (component, e) => {
    e.preventDefault();
};