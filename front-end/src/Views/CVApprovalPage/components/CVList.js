import React from "react";
import {Alert, ListGroup} from "react-bootstrap";
import CVPosition from "./CVPosition";
import CVLegend from "./CVLegend";

class CVList extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        const {
            cvs
        } = this.props;
        return (
            cvs.length > 0 ? (
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <CVLegend />
                    </ListGroup.Item>
                    {cvs.map((cv) => {
                        return (
                            <ListGroup.Item key={cv.cv_id}>
                                <CVPosition cv={cv}/>
                            </ListGroup.Item>
                        )
                    })}
                </ListGroup>
                ) : (
                    <Alert variant="info">Aktualnie nie ma żadnych CV do akceptacji.</Alert>
                )
        );
    }
}

export default CVList;