import React, {useContext, useState,useRef} from "react";
import { UserContext,AlertContext } from "context";
import {Button, Col, Row} from "react-bootstrap";
import {Redirect} from "react-router-dom";
import {acceptCV} from "Views/CVApprovalPage/functions/acceptCV";
import {getCVUrl} from "Views/CVApprovalPage/functions/getCVUrl";
import { DetailsItem } from 'components';
import proxy from "config/api";

const showCV = async (e, token, cvId,alertC) => {
    e.preventDefault();
    try {
        const response = await getCVUrl(token, cvId);

            let url = proxy.plain + response;
            window.open(url, '_blank');

    } catch (response) {
        alertC.current.showAlert("Wystąpił błąd.");
    }
};

const handleAcceptCV = async (e, token, cvId, alertC) => {
    e.preventDefault();
    try {
        const response = await acceptCV(token, cvId);
        if(response === "CV successfully verified.") {
            alertC.current.showAlert("Pomyślnie zaakceptowano CV.","success");
        }
    } catch (response) {
        alertC.current.showAlert("Wystąpił błąd.");
    }
};

const improveCV = (e, setRedirect) => {
    e.preventDefault();
    setRedirect(true);
};

const CVPosition = (props) => {
    const context = useContext(UserContext);
    const alertC = useRef(useContext(AlertContext));
    const cv = props.cv;
    const [redirect, setRedirect] = useState(false);

    return (
        <Row>
            <DetailsItem md={4} xl={2} label={"Imię"}>{cv.basic_info.first_name}</DetailsItem>
            <DetailsItem md={4} xl={3} label={"Nazwisko"}>{cv.basic_info.last_name}</DetailsItem>
            <DetailsItem md={4} xl={3} label={"Email"}>{cv.basic_info.email}</DetailsItem>
            <Col className="align-self-center d-flex justify-content-end">
                <Button
                    variant="primary m-1 p-1"
                    className="btnDownload"
                    onClick={e => showCV(e, context.token, cv.cv_id, alertC)}>
                    Pokaż CV
                </Button>
                <Button
                    variant="success m-1 p-1"
                    className="btnAccept"
                    onClick={e => handleAcceptCV(e, context.token, cv.cv_id, alertC)}>
                    Akceptuj
                </Button>
                <Button
    
                    variant="warning m-1 p-1"
                    className="btnImprove"
                    onClick={e => improveCV(e, setRedirect)}>
                    Zgłoś poprawki
                </Button>
            </Col>
            {redirect ? (
                <Redirect to={"/cvCorrection/" + cv.cv_id} />
            ) : null }
        </Row>
    );
};

export default CVPosition;