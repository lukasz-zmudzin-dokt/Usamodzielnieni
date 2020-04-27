import React from "react";
import { ListGroup } from "react-bootstrap";
import CVPosition from "./CVPosition";

const CVList = (props) => {
    return (
        <ListGroup>
            {props.cvs.map((cv) => {
                return (
                    <ListGroup.Item key={cv.cv_id}>
                        <CVPosition cv={cv}/>
                    </ListGroup.Item>
                )
            })}
        </ListGroup>
    );
};

export default CVList;