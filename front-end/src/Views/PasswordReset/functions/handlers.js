import {Redirect} from "react-router-dom";
import React from "react";

export const handleBlur = (component, e) => {
    component.setState({
        [e.target.name]: e.target.value
    })
};

export const validatePassword = (new_password, new_passwordR, setValidated, e) => {
    e.preventDefault();
  if (new_password !== new_passwordR)
      return "Hasła się nie zgadzają!";
  else if (new_password.length < 6)
      return "Hasło jest za krótkie!";
  else {
      setValidated();
      return null;
  }
};

export const renderRedirect = (redirect) => {
    if (redirect)
        return <Redirect to="/newPassword"/>
};

export const renderPasswordMessage = isOK => {
    if (isOK)
        return (
          <div className="message_pass_changed" data-testid="passMsg">
              <small className="msgText_correct">Hasło zostało zmienione. Przekierowuję...</small>
              {setTimeout( function () {
                return (<Redirect to="/login"/>)
              }, 3000)}
          </div>
        );
}