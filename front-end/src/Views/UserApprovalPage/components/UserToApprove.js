import React, { useContext, useEffect, useState, useRef } from "react";
import { Alert, Button, Card, ListGroup, Row } from "react-bootstrap";
import { UserContext, AlertContext } from "context";
import {
  getUserDetails,
  setUserApproved,
  setUserRejected,
} from "Views/UserApprovalPage/functions/apiCalls";
import { DetailsItem, DeletionModal } from "components";

const UserToApprove = ({ user, activeUser }) => {
  const context = useContext(UserContext);
  const [userDetails, setUserDetails] = useState([]);
  const [userDetailsFacilityAddress, setUserDetailsFacilityAddress] = useState(
    []
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [approved, setApproved] = useState(false);
  const [rejected, setRejected] = useState(false);
  const alertC = useRef(useContext(AlertContext));
  const [showRejectModal, setShowReject] = useState(false);
  const [rejectConfirmed, setRejectConfirmed] = useState(false);
  //const [showAcceptModal, setShowAccept] = useState(false);
  //const [acceptConfirmed, setAcceptConfirmed] = useState(false);

  useEffect(() => {
    const loadUserDetails = async (token, userId) => {
      setLoading(true);
      try {
        let res = await getUserDetails(token, userId);
        setUserDetails(res);
        if (user.type === "Standard") {
          setUserDetailsFacilityAddress(res.facility_address);
        } else {
          setUserDetailsFacilityAddress(res.company_address);
        }
      } catch (err) {
        setError(true);
      }
      setLoading(false);
    };
    if (user.id === activeUser) {
      loadUserDetails(context.token, user.id);
    }
  }, [context.token, user.id, user.type, activeUser]);

  const approveUser = async (e, token, userId) => {
    e.preventDefault();
    try {
      let res = await setUserApproved(token, userId);
      if (res === "User successfully verified.") {
        setApproved(true);
        alertC.current.showAlert("Konto zatwierdzone pomyślnie", "success");
      }
    } catch (err) {
      alertC.current.showAlert("Błąd. Nie udało się zatwierdzić użytkownika.");
    }
  };

  const rejectUser = async (e, token, userId) => {
    e.preventDefault();
    try {
      let res = await setUserRejected(token, userId);
      if (res === "User status successfully set to not verified.") {
        alertC.current.showAlert("Konto odrzucone pomyślnie", "success");
        setRejected(true);
      }
    } catch (err) {
      alertC.current.showAlert("Błąd. Nie udało się odrzucić użytkownika.");
    }
  };

  const handleOnClick = (e) => {
    if (e.target.id === "reject") setShowReject(true);
    /*else if(e.target.id === "accept")
            setShowAccept(true);*/
  };

  const address =
    user.type === "Standard" ? (
      <DetailsItem label="Adres">
        <p>{userDetails.facility_name}</p>
        <p>
          {userDetailsFacilityAddress.street}{" "}
          {userDetailsFacilityAddress.street_number}
        </p>
        <p>
          {userDetailsFacilityAddress.postal_code}{" "}
          {userDetailsFacilityAddress.city}
        </p>
      </DetailsItem>
    ) : (
      <>
        <DetailsItem label="Adres">
          <p>{userDetails.company_name}</p>
          <p>
            {userDetailsFacilityAddress.street}{" "}
            {userDetailsFacilityAddress.street_number}
          </p>
          <p>
            {userDetailsFacilityAddress.postal_code}{" "}
            {userDetailsFacilityAddress.city}
          </p>
        </DetailsItem>
        <DetailsItem label="NIP">{userDetails.nip}</DetailsItem>
      </>
    );

  const message = loading ? (
    <Alert className="mb-0" variant="info">
      Ładuję...
    </Alert>
  ) : error ? (
    <Alert variant="danger">
      Błąd. Nie udało się załadować danych użytkownika.
    </Alert>
  ) : approved ? (
    <Alert className="mb-0" variant="success">
      Konto zatwierdzone pomyślnie.
    </Alert>
  ) : rejected ? (
    <Alert className="mb-0" variant="success">
      Konto odrzucone pomyślnie.
    </Alert>
  ) : null;

  if (rejectConfirmed) rejectUser(context.token, user.id);
  /*if(acceptConfirmed)
        approveUser(context.token, user.id);*/

  if (message) {
    return message;
  } else {
    return (
      <Card.Body>
        {DeletionModal(
          showRejectModal,
          setShowReject,
          setRejectConfirmed,
          "Czy na pewno chcesz odrzucić tego użytkownika?",
          "Odrzuć",
          "Anuluj"
        )}
        <ListGroup variant="flush">
          <ListGroup.Item>
            <Row>
              <DetailsItem md={4} label="Nazwa użytkownika">
                {userDetails.username}
              </DetailsItem>
              <DetailsItem label="Imię">{userDetails.first_name}</DetailsItem>
              <DetailsItem label="Nazwisko">
                {userDetails.last_name}
              </DetailsItem>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <DetailsItem label="Email">{userDetails.email}</DetailsItem>
              <DetailsItem label="Telefon">
                {userDetails.phone_number}
              </DetailsItem>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>{address}</Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row className="justify-content-center">
              <Button
                onClick={(e) => approveUser(e, context.token, user.id)}
                variant="success"
                id="accept"
              >
                Akceptuj
              </Button>
              <Button
                onClick={(e) => handleOnClick(e)}
                variant="danger"
                className="ml-3"
                id="reject"
              >
                Odrzuć
              </Button>
            </Row>
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>
    );
  }
};

export default UserToApprove;
