import React, {useState} from "react";
import {Button, Card} from "react-bootstrap";

export const copyToClipboard = (text, setCopied) => {
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
      <Card bg="primary" text="light" className="my-3">
          <Card.Body>
              <Card.Title>{name}</Card.Title>
              <Card.Text>
                  {number}
              </Card.Text>
          </Card.Body>
          <Card.Footer>
              <Button variant="light" block size="sm" onClick={e => copyToClipboard(number, setCopied)}>
                  {copied ? "Skopiowano" : "Skopiuj ten numer"}
              </Button>
          </Card.Footer>
      </Card>
  )
};

export default PhoneCard;