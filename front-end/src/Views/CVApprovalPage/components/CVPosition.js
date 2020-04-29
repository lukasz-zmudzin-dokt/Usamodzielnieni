import React, {useContext, useState} from "react";
import { UserContext } from "context";
import {Alert, Button, Col, Row} from "react-bootstrap";
import {Redirect} from "react-router-dom";
import {acceptCV} from "Views/CVApprovalPage/functions/acceptCV";
import {getCVUrl} from "Views/CVApprovalPage/functions/getCVUrl";
import { DetailsItem } from 'components';
import proxy from "config/api";

const showCV = async (e, token, cvId, setError) => {
    e.preventDefault();
    try {
        const response = await getCVUrl(token, cvId);

            let url = proxy.plain + response;
            window.open(url, '_blank');

    } catch (response) {
        setError(true);
    }
};

const handleAcceptCV = async (e, token, cvId, setError, setAccepted) => {
    e.preventDefault();
    try {
        const response = await acceptCV(token, cvId);
        if(response === "CV successfully verified.") {
            setAccepted(true);
        }
    } catch (response) {
        setError(true);
    }
};

const improveCV = (e, setRedirect) => {
    e.preventDefault();
    setRedirect(true);
};

const CVPosition = (props) => {
    const context = useContext(UserContext);
    const cv = props.cv;
    const [error, setError] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [accepted, setAccepted] = useState(false);

    const message = error ? (
        <Alert variant="danger" className="p-1 m-1">Wystąpił błąd.</Alert>
    ) : accepted ? (
        <Alert variant="success" className="p-1 m-1">Pomyślnie zaakceptowano CV.</Alert>
    ) : null;

    return (
        <Row>
            <DetailsItem md={4} xl={2} label={"Imię"}>{cv.basic_info.first_name}</DetailsItem>
            <DetailsItem md={4} xl={3} label={"Nazwisko"}>{cv.basic_info.last_name}</DetailsItem>
            <DetailsItem md={4} xl={3} label={"Email"}>{cv.basic_info.email}</DetailsItem>
            <Col className="align-self-center d-flex justify-content-end">
                <Button
                    variant="primary m-1 p-1"
                    className="btnDownload"
                    onClick={e => showCV(e, context.token, cv.cv_id, setError)}>
                    Pokaż CV
                </Button>
                <Button
                    variant="success m-1 p-1"
                    className="btnAccept"
                    onClick={e => handleAcceptCV(e, context.token, cv.cv_id, setError, setAccepted)}>
                    Akceptuj
                </Button>
                <Button
                    variant="warning m-1 p-1"
                    className="btnImprove"
                    onClick={e => improveCV(e, setRedirect)}>
                    Zgłoś poprawki
                </Button>
            </Col>
            {message ? ( message ) : null}
            {redirect ? (
                <Redirect to={"/cvEditor/" + cv.cv_id} />
            ) : null }
        </Row>
    );
};

export default CVPosition;