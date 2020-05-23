import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { DeletionModal } from "components";
import { userTypes } from "constants/userTypes";
import proxy from "config/api";
import { staffTypes } from "constants/staffTypes";

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

const deleteCard = async (id, token) => {
  const url = proxy.contact + "contact/" + id + "/";
  const headers = {
    Authorization: "Token " + token,
    "Content-Type": "application/json",
  };

  const res = await fetch(url, { headers, method: "DELETE" });

  if (res.status === 200) {
    return await res.json();
  } else {
    throw res.status;
  }
};

const PhoneCard = ({ contact, user, cutItem, alertC }) => {
  const [copied, setCopied] = useState(false);
  const [show, setShow] = useState(null);

  const handleDeletion = async () => {
    try {
      const id = contact.id;
      await deleteCard(id, user.token);
      alertC.showAlert("Pomyślnie usunięto kartę kontaktu.", "success");
      cutItem(id);
    } catch (e) {
      console.log(e);
      if (e === 404) {
        alertC.showAlert("Ta karta została już usunięta.");
      } else {
        alertC.showAlert("Wystąpił błąd podczas usuwania karty kontaktu.");
      }
    }
  };

  return (
    <Card bg="outline-primary" text="dark" className="my-3">
      <Card.Body>
        <Card.Title className="d-flex justify-content-between" as="h2">
          {contact.phone}
          {user?.type === userTypes.STAFF &&
          user.data.group_type.includes(staffTypes.BLOG_MODERATOR) ? (
            <Button size="sm" variant="light" onClick={(e) => setShow(true)}>
              X
            </Button>
          ) : null}
        </Card.Title>
        <Card.Text>{contact.name}</Card.Text>
        <Button
          variant="primary"
          block
          size="sm"
          onClick={(e) => copyToClipboard(contact.phone, setCopied)}
        >
          {copied ? "Skopiowano" : "Skopiuj ten numer"}
        </Button>
      </Card.Body>
      {show ? (
        <DeletionModal
          show={show}
          setShow={setShow}
          question="Czy na pewno chcesz usunąć ten kontakt?"
          delConfirmed={handleDeletion}
        />
      ) : null}
    </Card>
  );
};

export default PhoneCard;
