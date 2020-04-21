import React from "react";
import { UserContext } from "context/UserContext";
import {Alert, Button, Col, Row} from "react-bootstrap";
import { Link } from "react-router-dom";
import {acceptCV} from "../functions/acceptCV";
import {getCVUrl} from "../functions/getCVUrl";

const showCV = (token, cvId) => {
    return getCVUrl(token, cvId).then(function (response) {
        if(response.status === "200:OK") {
            let url = "https://usamo-back.herokuapp.com" + response.result;
            window.open(url, '_blank');
        }
        return response.status;
    })
};

class CVPosition extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            errorMsg: ""
        };
    }

    render() {
        const {
            cv
        } = this.props;
        const {
            error,
            errorMsg,
        } = this.state;
        return (
            <Row className="d-flex align-items-center">
                <Col xs={12} md={3}>{cv.basic_info.first_name} {cv.basic_info.last_name}</Col>
                <Col xs={12} md={4}>
                    {cv.basic_info.email}
                </Col>
                <Col xs={12} md={5} className="d-flex justify-content-end">
                    <Button
                        variant="primary m-1 p-1"
                        className="btnDownload"
                        onClick={e => showCV(this.context.token, cv.cv_id)
                            .then(resp => resp !== "200:OK" ?
                            this.setState({ error:true, errorMsg: resp }) :
                            null
                        )}>
                            Pokaż CV
                    </Button>
                    <Button
                        variant="success m-1 p-1"
                        className="btnAccept"
                        onClick={e => acceptCV(this.context.token, cv.cv_id)
                            .then(resp => resp !== "OK" ?
                            this.setState({ error:true, errorMsg: resp }) :
                            window.location.reload()
                        )}>
                            Akceptuj
                    </Button>
                    <Link to={"/cvEditor/" + cv.cv_id} >
                        <Button variant="warning m-1 p-1" className="btnImprove">
                            Popraw
                        </Button>
                    </Link>
                </Col>
                {error ? (
                    <Col>
                        <Alert variant="danger" className="mt-3">
                            Ups, coś poszło nie tak. Kod błędu - {errorMsg}
                        </Alert>
                    </Col>
                ) : null}
            </Row>
        );
    }
}

CVPosition.contextType = UserContext;

export default CVPosition;