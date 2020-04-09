import React, {useState} from "react";
import {Card} from "react-bootstrap";

const copyToClipboard = (text, setCopied) => {
    setCopied(true);
    let dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
    setTimeout(() => setCopied(false), 1000);
};

const PhoneCard = ({name, number}) => {
  const [copied, setCopied] = useState(false);

  return (
      <Card bg="primary" text="light" onClick={e => copyToClipboard(number, setCopied)}>
          <Card.Body className="custom_card">
              <Card.Title>{name}</Card.Title>
              <Card.Text>
                  {number}
              </Card.Text>
          </Card.Body>
          <Card.Footer>
                  {copied ? "Skopiowano" : "Skopiuj ten numer"}
          </Card.Footer>
      </Card>
  )
};

export default PhoneCard;