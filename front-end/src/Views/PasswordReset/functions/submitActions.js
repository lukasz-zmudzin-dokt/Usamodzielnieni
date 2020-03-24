import React from "react";
import {Button} from "react-bootstrap";
import {renderRedirect} from "./handlers";

export const renderMessage = correct => {
  if (correct) {
      return (
          <div className="submit_message" data-testid="submit_message">
              <small className="msg_text">Wysłano maila. Sprawdź skrzynkę i przejdź dalej!</small>
              <Button className="email_prompt_redirect" onClick={e => renderRedirect(e)}>Przejdź dalej</Button>
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

export const handlePasswordChange = (component, e) => {
    e.preventDefault();
};