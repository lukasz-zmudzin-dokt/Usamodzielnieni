import React, { useContext, useEffect, useState, useRef } from "react";
import { Alert, Button, Card, ListGroup, Row } from "react-bootstrap";
import { UserContext, AlertContext } from "context";
import {
  getUserDetails,
  setUserApproved,
  setUserRejected,
} from "Views/UserApprovalPage/functions/apiCalls";
import { DetailsItem, DeletionModal } from "components";
import { userTypes } from "constants/userTypes";

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
        if (user.type === userTypes.STANDARD) {
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

  const approveUser = async (token, userId) => {
    try {
      await setUserApproved(token, userId);
      setApproved(true);
      alertC.current.showAlert("Konto zatwierdzone pomyślnie", "success");
    } catch (err) {
      alertC.current.showAlert("Błąd. Nie udało się zatwierdzić użytkownika.");
    }
  };

  const rejectUser = async (token, userId) => {
    try {
      await setUserRejected(token, userId);
      setRejected(true);
      alertC.current.showAlert("Konto odrzucone pomyślnie", "success");
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
    user.type === userTypes.STANDARD ? (
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
        <DeletionModal
          show={showRejectModal}
          setShow={setShowReject}
          delConfirmed={setRejectConfirmed}
          question={"Czy na pewno chcesz odrzucić tego użytkownika?"}
          confirmLabel={"Odrzuć"}
          cancelLabel={"Anuluj"}
        />
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
                onClick={(e) => approveUser(context.token, user.id)}
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
