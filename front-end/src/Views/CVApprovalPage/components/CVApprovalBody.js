import React from "react";
import NoCVs from "./NoCVs";
import CVLegend from "./CVLegend";
import CVsToApprove from "./CVsToApprove";
import {ListGroup} from "react-bootstrap";

const CVApprovalBody = ({ cvs = [], token, component }) => {
    return (
        <div>
            <ListGroup variant="flush">
                    <NoCVs cvs={cvs} />
                <ListGroup.Item>
                    <CVLegend cvs={cvs} />
                </ListGroup.Item>
                <CVsToApprove cvs={cvs} token={token} component={component}/>
            </ListGroup>
        </div>
    )
};

export default CVApprovalBody;



