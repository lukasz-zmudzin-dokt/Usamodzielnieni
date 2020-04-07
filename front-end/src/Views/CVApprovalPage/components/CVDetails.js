import React from "react";
import {Button, Col, Row} from "react-bootstrap";
import { acceptCV } from "Views/CVApprovalPage/functions/acceptCV";
import {Link} from "react-router-dom";
import { showCV } from "Views/CVApprovalPage/functions/showCV";

const CVDetails = ({ cv, token, component })  => {
    return (
        <Row className="mt-3">
            <Col xs={6} md={2}>{cv.basic_info.first_name}</Col>
            <Col xs={6} md={2}>{cv.basic_info.last_name}</Col>
            <Col xs={12} md={4}>
                {cv.basic_info.email}
            </Col>
            <Col xs={12} md={4} className="d-flex justify-content-end">
                <Button variant="primary m-1 p-1" className="btnDownload" onClick={e => (showCV(cv.cv_id, token, component))}>Pokaż CV</Button>
                <Button variant="success m-1 p-1" className="btnAccept" onClick={e => (acceptCV(e, cv.cv_id))}>Akceptuj</Button>
                <Link to={"/cvEditor/" + cv.cv_id} ><Button variant="warning m-1 p-1" className="btnImprove">Popraw</Button></Link>
            </Col>
        </Row>
    );
};

export default CVDetails;