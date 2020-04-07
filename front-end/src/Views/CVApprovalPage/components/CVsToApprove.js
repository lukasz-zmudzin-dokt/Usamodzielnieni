import React from "react";
import CVDetails from "./CVDetails";
import {ListGroup} from "react-bootstrap";

const CVsToApprove = ({ cvs, token }) => {
    if(cvs.length > 0) {
        return (
            cvs.map((value) => {
                return (
                    <ListGroup.Item>
                        <CVDetails cv={value} key={value.cv_id} token={token}/>
                    </ListGroup.Item>
                )
            })
        );
    } else {
        return null;
    }
};

export default CVsToApprove;