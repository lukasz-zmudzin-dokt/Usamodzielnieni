import React from "react";
import {Alert, Button} from "react-bootstrap";

export const renderMessage = (correct, onClick) => {
  if (correct) {
      return (
          <div className="submit_message" data-testid="submit_message">
              <Alert variant="success" className="msg_text">Wysłano maila. Sprawdź skrzynkę i przejdź dalej!</Alert>
              <Button className="email_prompt_redirect" data-testid="btn_redirect" onClick={onClick}>Przejdź dalej</Button>
          </div>
      );
  }
  return null;
};

export const handleSubmit = (email, setCorrect, e) => {
    const url = "http://usamo-back.herokuapp.com/account/password_reset/";
    e.preventDefault();
    console.log(JSON.stringify(email));
    fetch(url, {
       method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
       body: JSON.stringify(email)
    }).then( response => {
        if (response.status === 201 || response.status === 200) {
            setCorrect();
            response.json().then( res => {
                console.log(res);
            })
        }
    });

};

export const handlePasswordChange = (object, setPasswordChanged, e) => {
    const url = "http://usamo-back.herokuapp.com/account/password_reset/confirm/";
    e.preventDefault();
    console.log(JSON.stringify(object));
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(object)
    }).then(response => {
        if (response.status === 201 || response.status === 200) {
            setPasswordChanged();
        }
        response.json().then( res => {
            console.log(res);
        });
    });
};