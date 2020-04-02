import React from "react";
import {Button, Col, Row} from "react-bootstrap";
import { downloadCV } from "../functions/downloadCV";
import { acceptCV } from "../functions/acceptCV";
import {Link} from "react-router-dom";

const CVDetails = ({ cv })  => {
    return (
        <Row className="mt-3">
            <Col xs={6} md={2}>{cv.basic_info.first_name}</Col>
            <Col xs={6} md={2}>{cv.basic_info.last_name}</Col>
            <Col xs={12} md={4}>
                {cv.basic_info.email}
            </Col>
            <Col xs={12} md={4} className="d-flex justify-content-end">
                <Button variant="primary m-1 p-1" className="btnDownload" onClick={e => (downloadCV(e, cv.cv_id))}>Pobierz</Button>
                <Button variant="success m-1 p-1" className="btnAccept" onClick={e => (acceptCV(e, cv.cv_id))}>Akceptuj</Button>
                <Link to="/"/*tu będzie link do strony poprawiania cv*/ ><Button variant="warning m-1 p-1" className="btnImprove">Popraw</Button></Link>
            </Col>
        </Row>
    );
};

export default CVDetails;