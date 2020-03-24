import {Redirect} from "react-router-dom";
import React from "react";

export const handleBlur = (component, e) => {
    component.setState({
        [e.target.name]: e.target.value
    })
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

export const renderRedirect = event => {
    return <Redirect to="/newPassword"/>
};